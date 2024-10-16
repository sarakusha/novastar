import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviOf4KInfo(addr: number): Promise<Buffer>;
    tryReadDviOf4KInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDviOf4KInfo(addr: number): Request {
  const req = new Request(AddressMapping.DVIOf4KInfoOccupancy, 'ReadDviOf4KInfo');
  req.destination = addr;
  req.address = AddressMapping.DVIOf4KInfoAddr;
  return req;
}
Session.prototype.ReadDviOf4KInfo = async function ReadDviOf4KInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadDviOf4KInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadDviOf4KInfo = async function tryReadDviOf4KInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDviOf4KInfo(addr);
  return this.connection.trySend(req);
};
