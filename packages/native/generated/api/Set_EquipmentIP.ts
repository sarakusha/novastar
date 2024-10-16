import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set_EquipmentIP(addr: number, bBoradcast: boolean, data: number[] | Buffer): Promise<void>;
    trySet_EquipmentIP(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSet_EquipmentIP<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'Set_EquipmentIP');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoEquipmentIPAddr;
  return req;
}
Session.prototype.Set_EquipmentIP = async function Set_EquipmentIP(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSet_EquipmentIP(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySet_EquipmentIP = async function trySet_EquipmentIP(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSet_EquipmentIP(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
