import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_AuthorizePassward(addr: number): Promise<Buffer>;
    tryReadSender_AuthorizePassward(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_AuthorizePassward(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_AuthorizePasswardOccupancy,
    'ReadSender_AuthorizePassward'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_AuthorizePasswardAddr;
  return req;
}
Session.prototype.ReadSender_AuthorizePassward = async function ReadSender_AuthorizePassward(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_AuthorizePassward(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_AuthorizePassward = async function tryReadSender_AuthorizePassward(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_AuthorizePassward(addr);
  return this.connection.trySend(req);
};
