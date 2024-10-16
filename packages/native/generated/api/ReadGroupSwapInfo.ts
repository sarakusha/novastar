import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGroupSwapInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadGroupSwapInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGroupSwapInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GroupSwapInfoOccupancy, 'ReadGroupSwapInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GroupSwapInfoAddr;
  return req;
}
Session.prototype.ReadGroupSwapInfo = async function ReadGroupSwapInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadGroupSwapInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadGroupSwapInfo = async function tryReadGroupSwapInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGroupSwapInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
