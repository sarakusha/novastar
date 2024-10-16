import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGclkHigh(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGclkHigh(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadGclkHigh(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GclkHighOccupancy, 'ReadGclkHigh');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkHighAddr;
  return req;
}
Session.prototype.ReadGclkHigh = async function ReadGclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGclkHigh(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGclkHigh = async function tryReadGclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGclkHigh(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
