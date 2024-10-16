import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EncryptKeyRegion(addr: number): Promise<Buffer>;
    tryReadSender_EncryptKeyRegion(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EncryptKeyRegion(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EncryptKeyRegionOccupancy,
    'ReadSender_EncryptKeyRegion'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptKeyRegionAddr;
  return req;
}
Session.prototype.ReadSender_EncryptKeyRegion = async function ReadSender_EncryptKeyRegion(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_EncryptKeyRegion(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_EncryptKeyRegion = async function tryReadSender_EncryptKeyRegion(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EncryptKeyRegion(addr);
  return this.connection.trySend(req);
};
