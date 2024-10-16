import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read_EquipmentIP(addr: number): Promise<Buffer>;
    tryRead_EquipmentIP(addr: number): Promise<Packet | null>;
  }
}
export default function createRead_EquipmentIP(addr: number): Request {
  const req = new Request(AddressMapping.Sender_VideoEquipmentIPOccupancy, 'Read_EquipmentIP');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoEquipmentIPAddr;
  return req;
}
Session.prototype.Read_EquipmentIP = async function Read_EquipmentIP(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createRead_EquipmentIP(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead_EquipmentIP = async function tryRead_EquipmentIP(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createRead_EquipmentIP(addr);
  return this.connection.trySend(req);
};
