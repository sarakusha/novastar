import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoRealDvi(addr: number): Promise<Buffer>;
    tryReadSender_VideoRealDvi(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoRealDvi(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_VideoRealDviAddrOccupancy,
    'ReadSender_VideoRealDvi'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoRealDviAddr;
  return req;
}
Session.prototype.ReadSender_VideoRealDvi = async function ReadSender_VideoRealDvi(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_VideoRealDvi(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_VideoRealDvi = async function tryReadSender_VideoRealDvi(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoRealDvi(addr);
  return this.connection.trySend(req);
};
