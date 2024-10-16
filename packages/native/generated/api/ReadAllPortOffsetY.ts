import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllPortOffsetY(addr: number): Promise<Buffer>;
    tryReadAllPortOffsetY(addr: number): Promise<Packet | null>;
  }
}
export default function createReadAllPortOffsetY(addr: number): Request {
  const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortOffsetY');
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr;
  return req;
}
Session.prototype.ReadAllPortOffsetY = async function ReadAllPortOffsetY(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadAllPortOffsetY(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllPortOffsetY = async function tryReadAllPortOffsetY(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadAllPortOffsetY(addr);
  return this.connection.trySend(req);
};
