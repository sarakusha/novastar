import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadResolutionExtend(addr: number): Promise<Buffer>;
    tryReadResolutionExtend(addr: number): Promise<Packet | null>;
  }
}
export default function createReadResolutionExtend(addr: number): Request {
  const req = new Request(AddressMapping.Sender_ResolutionExtendOccupancy, 'ReadResolutionExtend');
  req.destination = addr;
  req.address = AddressMapping.Sender_ResolutionExtendAddr;
  return req;
}
Session.prototype.ReadResolutionExtend = async function ReadResolutionExtend(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadResolutionExtend(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadResolutionExtend = async function tryReadResolutionExtend(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadResolutionExtend(addr);
  return this.connection.trySend(req);
};
