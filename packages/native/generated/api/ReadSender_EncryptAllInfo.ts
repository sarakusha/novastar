import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EncryptAllInfo(addr: number): Promise<Buffer>;
    tryReadSender_EncryptAllInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EncryptAllInfo(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EncryptAllInfoOccupancy,
    'ReadSender_EncryptAllInfo'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptAllInfoAddr;
  return req;
}
Session.prototype.ReadSender_EncryptAllInfo = async function ReadSender_EncryptAllInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_EncryptAllInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_EncryptAllInfo = async function tryReadSender_EncryptAllInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EncryptAllInfo(addr);
  return this.connection.trySend(req);
};
