import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EDIDSpace(addr: number): Promise<Buffer>;
    tryReadSender_EDIDSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EDIDSpace(addr: number): Request {
  const req = new Request(AddressMapping.Sender_EDIDSpaceOccupancy, 'ReadSender_EDIDSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_EDIDSpaceAddr;
  return req;
}
Session.prototype.ReadSender_EDIDSpace = async function ReadSender_EDIDSpace(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_EDIDSpace(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_EDIDSpace = async function tryReadSender_EDIDSpace(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EDIDSpace(addr);
  return this.connection.trySend(req);
};
