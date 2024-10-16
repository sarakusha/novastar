import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EncryptKey(addr: number): Promise<Buffer>;
    tryReadSender_EncryptKey(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EncryptKey(addr: number): Request {
  const req = new Request(AddressMapping.Sender_EncryptKeyOccupancy, 'ReadSender_EncryptKey');
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptKeyAddr;
  return req;
}
Session.prototype.ReadSender_EncryptKey = async function ReadSender_EncryptKey(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_EncryptKey(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_EncryptKey = async function tryReadSender_EncryptKey(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EncryptKey(addr);
  return this.connection.trySend(req);
};
