import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetAddrExtend(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      addrExtend: number
    ): Promise<void>;
    trySetAddrExtend(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      addrExtend: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetAddrExtend<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  addrExtend: number
): Request<Broadcast> {
  const $data = encodeUIntLE(addrExtend, AddressMapping.AddrExtendOccupancy);
  const req = new Request($data, bBroadcast, 'SetAddrExtend');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AddrExtendAddr;
  return req;
}
Session.prototype.SetAddrExtend = async function SetAddrExtend(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  addrExtend: number
): Promise<void> {
  const req = createSetAddrExtend(addr, portAddr, scanBoardAddr, bBroadcast, addrExtend);
  await this.connection.send(req);
};
Session.prototype.trySetAddrExtend = async function trySetAddrExtend(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  addrExtend: number
): Promise<ErrorType | null> {
  const req = createSetAddrExtend(addr, portAddr, scanBoardAddr, false, addrExtend);
  return (await this.connection.trySend(req))?.ack ?? null;
};
