import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPCMacAddr(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sendCardSn: number[] | Buffer
    ): Promise<void>;
    trySetPCMacAddr(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sendCardSn: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetPCMacAddr<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sendCardSn: number[] | Buffer
): Request<Broadcast> {
  if (sendCardSn.length !== AddressMapping.PCMacAddrOccupancy)
    throw new TypeError(`Invalid buffer size: ${sendCardSn.length}`);
  const req = new Request(sendCardSn, bBroadcast, 'SetPCMacAddr');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PCMacAddrAddr;
  return req;
}
Session.prototype.SetPCMacAddr = async function SetPCMacAddr(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sendCardSn: number[] | Buffer
): Promise<void> {
  const req = createSetPCMacAddr(addr, portAddr, scanBoardAddr, bBroadcast, sendCardSn);
  await this.connection.send(req);
};
Session.prototype.trySetPCMacAddr = async function trySetPCMacAddr(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sendCardSn: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetPCMacAddr(addr, portAddr, scanBoardAddr, false, sendCardSn);
  return (await this.connection.trySend(req))?.ack ?? null;
};
