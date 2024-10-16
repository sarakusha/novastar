import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_NewFrame(addr: number): Promise<number>;
    tryReadSender_NewFrame(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_NewFrame(addr: number): Request {
  const req = new Request(AddressMapping.Sender_NewFrameOccupancy, 'ReadSender_NewFrame');
  req.destination = addr;
  req.address = AddressMapping.Sender_NewFrameAddr;
  return req;
}
Session.prototype.ReadSender_NewFrame = async function ReadSender_NewFrame(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_NewFrame(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_NewFrame = async function tryReadSender_NewFrame(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_NewFrame(addr);
  return this.connection.trySend(req);
};
