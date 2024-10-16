import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EncryptKeyLength(addr: number): Promise<number>;
    tryReadSender_EncryptKeyLength(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EncryptKeyLength(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EncryptKeyLengthOccupancy,
    'ReadSender_EncryptKeyLength'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptKeyLengthAddr;
  return req;
}
Session.prototype.ReadSender_EncryptKeyLength = async function ReadSender_EncryptKeyLength(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_EncryptKeyLength(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_EncryptKeyLength = async function tryReadSender_EncryptKeyLength(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EncryptKeyLength(addr);
  return this.connection.trySend(req);
};
