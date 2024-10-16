import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read_VideoSourceState(addr: number): Promise<Buffer>;
    tryRead_VideoSourceState(addr: number): Promise<Packet | null>;
  }
}
export default function createRead_VideoSourceState(addr: number): Request {
  const req = new Request(AddressMapping.Sender_VideoSourceStateOccupancy, 'Read_VideoSourceState');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoSourceStateAddr;
  return req;
}
Session.prototype.Read_VideoSourceState = async function Read_VideoSourceState(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createRead_VideoSourceState(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead_VideoSourceState = async function tryRead_VideoSourceState(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createRead_VideoSourceState(addr);
  return this.connection.trySend(req);
};
