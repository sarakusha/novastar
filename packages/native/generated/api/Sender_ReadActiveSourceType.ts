import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Sender_ReadActiveSourceType(addr: number): Promise<number>;
    trySender_ReadActiveSourceType(addr: number): Promise<Packet | null>;
  }
}
export default function createSender_ReadActiveSourceType(addr: number): Request {
  const req = new Request(AddressMapping.ActiveSourceTypeOccupancy, 'Sender_ReadActiveSourceType');
  req.destination = addr;
  req.address = AddressMapping.ActiveSourceTypeAddr;
  return req;
}
Session.prototype.Sender_ReadActiveSourceType = async function Sender_ReadActiveSourceType(
  this: Session,
  addr: number
): Promise<number> {
  const req = createSender_ReadActiveSourceType(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.trySender_ReadActiveSourceType = async function trySender_ReadActiveSourceType(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createSender_ReadActiveSourceType(addr);
  return this.connection.trySend(req);
};
