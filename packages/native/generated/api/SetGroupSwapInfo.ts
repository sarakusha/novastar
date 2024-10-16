import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGroupSwapInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      groupSwapInfo: number[] | Buffer
    ): Promise<void>;
    trySetGroupSwapInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      groupSwapInfo: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGroupSwapInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  groupSwapInfo: number[] | Buffer
): Request<Broadcast> {
  if (groupSwapInfo.length !== AddressMapping.GroupSwapInfoOccupancy)
    throw new TypeError(`Invalid buffer size: ${groupSwapInfo.length}`);
  const req = new Request(groupSwapInfo, bBroadcast, 'SetGroupSwapInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GroupSwapInfoAddr;
  return req;
}
Session.prototype.SetGroupSwapInfo = async function SetGroupSwapInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  groupSwapInfo: number[] | Buffer
): Promise<void> {
  const req = createSetGroupSwapInfo(addr, portAddr, scanBoardAddr, bBroadcast, groupSwapInfo);
  await this.connection.send(req);
};
Session.prototype.trySetGroupSwapInfo = async function trySetGroupSwapInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  groupSwapInfo: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetGroupSwapInfo(addr, portAddr, scanBoardAddr, false, groupSwapInfo);
  return (await this.connection.trySend(req))?.ack ?? null;
};
