import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGroupSwapEn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGroupSwapEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGroupSwapEn(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GroupSwapEnOccupancy, 'ReadGroupSwapEn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GroupSwapEnAddr;
  return req;
}
Session.prototype.ReadGroupSwapEn = async function ReadGroupSwapEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGroupSwapEn(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGroupSwapEn = async function tryReadGroupSwapEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGroupSwapEn(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
