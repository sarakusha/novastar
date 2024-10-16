import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviOffsetY(addr: number, index: number): Promise<number>;
    tryReadDviOffsetY(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadDviOffsetY(addr: number, index: number): Request {
  const req = new Request(AddressMapping.DviOffsetYOccupancy, 'ReadDviOffsetY');
  req.destination = addr;
  req.address = AddressMapping.DviOffsetYAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.ReadDviOffsetY = async function ReadDviOffsetY(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadDviOffsetY(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviOffsetY = async function tryReadDviOffsetY(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadDviOffsetY(addr, index);
  return this.connection.trySend(req);
};
