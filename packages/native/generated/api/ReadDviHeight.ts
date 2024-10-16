import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviHeight(addr: number, index: number): Promise<number>;
    tryReadDviHeight(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadDviHeight(addr: number, index: number): Request {
  const req = new Request(AddressMapping.DviHeightOccupancy, 'ReadDviHeight');
  req.destination = addr;
  req.address = AddressMapping.DviHeightAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.ReadDviHeight = async function ReadDviHeight(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadDviHeight(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviHeight = async function tryReadDviHeight(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadDviHeight(addr, index);
  return this.connection.trySend(req);
};
