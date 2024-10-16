import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllPortHeight(addr: number): Promise<Buffer>;
    tryReadAllPortHeight(addr: number): Promise<Packet | null>;
  }
}
export default function createReadAllPortHeight(addr: number): Request {
  const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortHeight');
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr;
  return req;
}
Session.prototype.ReadAllPortHeight = async function ReadAllPortHeight(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadAllPortHeight(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllPortHeight = async function tryReadAllPortHeight(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadAllPortHeight(addr);
  return this.connection.trySend(req);
};
