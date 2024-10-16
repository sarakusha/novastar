import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviWidth(addr: number, index: number): Promise<number>;
    tryReadDviWidth(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadDviWidth(addr: number, index: number): Request {
  const req = new Request(AddressMapping.DviWidthOccupancy, 'ReadDviWidth');
  req.destination = addr;
  req.address = AddressMapping.DviWidthAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.ReadDviWidth = async function ReadDviWidth(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadDviWidth(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviWidth = async function tryReadDviWidth(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadDviWidth(addr, index);
  return this.connection.trySend(req);
};
