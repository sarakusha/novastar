import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_DVICols(addr: number): Promise<number>;
    tryReadSender_DVICols(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_DVICols(addr: number): Request {
  const req = new Request(AddressMapping.Sender_DVIColsOccupancy, 'ReadSender_DVICols');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIColsAddr;
  return req;
}
Session.prototype.ReadSender_DVICols = async function ReadSender_DVICols(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_DVICols(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_DVICols = async function tryReadSender_DVICols(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_DVICols(addr);
  return this.connection.trySend(req);
};
