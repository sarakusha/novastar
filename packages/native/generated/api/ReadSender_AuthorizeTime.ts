import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_AuthorizeTime(addr: number): Promise<number>;
    tryReadSender_AuthorizeTime(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_AuthorizeTime(addr: number): Request {
  const req = new Request(AddressMapping.Sender_AuthorizeTimeOccupancy, 'ReadSender_AuthorizeTime');
  req.destination = addr;
  req.address = AddressMapping.Sender_AuthorizeTimeAddr;
  return req;
}
Session.prototype.ReadSender_AuthorizeTime = async function ReadSender_AuthorizeTime(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_AuthorizeTime(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_AuthorizeTime = async function tryReadSender_AuthorizeTime(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_AuthorizeTime(addr);
  return this.connection.trySend(req);
};
