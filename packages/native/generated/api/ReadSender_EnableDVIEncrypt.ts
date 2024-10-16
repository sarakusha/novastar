import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableDVIEncrypt(addr: number): Promise<number>;
    tryReadSender_EnableDVIEncrypt(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableDVIEncrypt(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableDVIEncryptOccupancy,
    'ReadSender_EnableDVIEncrypt'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableDVIEncryptAddr;
  return req;
}
Session.prototype.ReadSender_EnableDVIEncrypt = async function ReadSender_EnableDVIEncrypt(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_EnableDVIEncrypt(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_EnableDVIEncrypt = async function tryReadSender_EnableDVIEncrypt(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EnableDVIEncrypt(addr);
  return this.connection.trySend(req);
};
