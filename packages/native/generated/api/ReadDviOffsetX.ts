import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviOffsetX(addr: number, index: number): Promise<number>;
    tryReadDviOffsetX(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadDviOffsetX(addr: number, index: number): Request {
  const req = new Request(AddressMapping.DviOffsetXOccupancy, 'ReadDviOffsetX');
  req.destination = addr;
  req.address = AddressMapping.DviOffsetXAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.ReadDviOffsetX = async function ReadDviOffsetX(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadDviOffsetX(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviOffsetX = async function tryReadDviOffsetX(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadDviOffsetX(addr, index);
  return this.connection.trySend(req);
};
