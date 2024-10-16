import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EncryptPassword(addr: number): Promise<Buffer>;
    tryReadSender_EncryptPassword(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EncryptPassword(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EncryptPasswordOccupancy,
    'ReadSender_EncryptPassword'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptPasswordAddr;
  return req;
}
Session.prototype.ReadSender_EncryptPassword = async function ReadSender_EncryptPassword(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_EncryptPassword(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_EncryptPassword = async function tryReadSender_EncryptPassword(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EncryptPassword(addr);
  return this.connection.trySend(req);
};
