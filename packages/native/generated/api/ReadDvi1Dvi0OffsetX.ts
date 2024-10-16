import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDvi1Dvi0OffsetX(addr: number): Promise<number>;
    tryReadDvi1Dvi0OffsetX(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDvi1Dvi0OffsetX(addr: number): Request {
  const req = new Request(AddressMapping.Dvi1Dvi0OffsetXOccupancy, 'ReadDvi1Dvi0OffsetX');
  req.destination = addr;
  req.address = AddressMapping.Dvi1Dvi0OffsetXAddr;
  return req;
}
Session.prototype.ReadDvi1Dvi0OffsetX = async function ReadDvi1Dvi0OffsetX(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDvi1Dvi0OffsetX(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDvi1Dvi0OffsetX = async function tryReadDvi1Dvi0OffsetX(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDvi1Dvi0OffsetX(addr);
  return this.connection.trySend(req);
};
