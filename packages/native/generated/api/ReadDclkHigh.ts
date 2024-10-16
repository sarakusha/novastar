import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDclkHigh(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDclkHigh(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadDclkHigh(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DclkHighOccupancy, 'ReadDclkHigh');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkHighAddr;
  return req;
}
Session.prototype.ReadDclkHigh = async function ReadDclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDclkHigh(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDclkHigh = async function tryReadDclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDclkHigh(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
