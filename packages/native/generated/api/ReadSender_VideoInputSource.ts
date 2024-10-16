import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoInputSource(addr: number): Promise<Buffer>;
    tryReadSender_VideoInputSource(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoInputSource(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_VideoInputSourceOccupancy,
    'ReadSender_VideoInputSource'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoInputSourceAddr;
  return req;
}
Session.prototype.ReadSender_VideoInputSource = async function ReadSender_VideoInputSource(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_VideoInputSource(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_VideoInputSource = async function tryReadSender_VideoInputSource(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoInputSource(addr);
  return this.connection.trySend(req);
};
