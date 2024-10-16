import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDvi1Dvi0OffsetY(addr: number): Promise<number>;
    tryReadDvi1Dvi0OffsetY(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDvi1Dvi0OffsetY(addr: number): Request {
  const req = new Request(AddressMapping.Dvi1Dvi0OffsetYOccupancy, 'ReadDvi1Dvi0OffsetY');
  req.destination = addr;
  req.address = AddressMapping.Dvi1Dvi0OffsetYAddr;
  return req;
}
Session.prototype.ReadDvi1Dvi0OffsetY = async function ReadDvi1Dvi0OffsetY(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDvi1Dvi0OffsetY(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDvi1Dvi0OffsetY = async function tryReadDvi1Dvi0OffsetY(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDvi1Dvi0OffsetY(addr);
  return this.connection.trySend(req);
};
