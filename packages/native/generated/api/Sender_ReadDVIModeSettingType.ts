import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Sender_ReadDVIModeSettingType(addr: number): Promise<number>;
    trySender_ReadDVIModeSettingType(addr: number): Promise<Packet | null>;
  }
}
export default function createSender_ReadDVIModeSettingType(addr: number): Request {
  const req = new Request(
    AddressMapping.DVIModeSettingAddrOccupancy,
    'Sender_ReadDVIModeSettingType'
  );
  req.destination = addr;
  req.address = AddressMapping.DVIModeSettingAddr;
  return req;
}
Session.prototype.Sender_ReadDVIModeSettingType = async function Sender_ReadDVIModeSettingType(
  this: Session,
  addr: number
): Promise<number> {
  const req = createSender_ReadDVIModeSettingType(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.trySender_ReadDVIModeSettingType =
  async function trySender_ReadDVIModeSettingType(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createSender_ReadDVIModeSettingType(addr);
    return this.connection.trySend(req);
  };
