import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_DVIRows(addr: number): Promise<number>;
    tryReadSender_DVIRows(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_DVIRows(addr: number): Request {
  const req = new Request(AddressMapping.Sender_DVIRowsOccupancy, 'ReadSender_DVIRows');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIRowsAddr;
  return req;
}
Session.prototype.ReadSender_DVIRows = async function ReadSender_DVIRows(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_DVIRows(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_DVIRows = async function tryReadSender_DVIRows(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_DVIRows(addr);
  return this.connection.trySend(req);
};
