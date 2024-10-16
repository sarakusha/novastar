import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllPortWidth(addr: number): Promise<Buffer>;
    tryReadAllPortWidth(addr: number): Promise<Packet | null>;
  }
}
export default function createReadAllPortWidth(addr: number): Request {
  const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortWidth');
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr;
  return req;
}
Session.prototype.ReadAllPortWidth = async function ReadAllPortWidth(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadAllPortWidth(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllPortWidth = async function tryReadAllPortWidth(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadAllPortWidth(addr);
  return this.connection.trySend(req);
};
