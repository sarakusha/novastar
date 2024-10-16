import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoWindowRect(addr: number): Promise<Buffer>;
    tryReadSender_VideoWindowRect(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoWindowRect(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_VideoWindowRectOccupancy,
    'ReadSender_VideoWindowRect'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoWindowRectAddr;
  return req;
}
Session.prototype.ReadSender_VideoWindowRect = async function ReadSender_VideoWindowRect(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_VideoWindowRect(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_VideoWindowRect = async function tryReadSender_VideoWindowRect(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoWindowRect(addr);
  return this.connection.trySend(req);
};
