import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSenderABLInfo(addr: number): Promise<Buffer>;
    tryReadSenderABLInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSenderABLInfo(addr: number): Request {
  const req = new Request(AddressMapping.SenderABLOccupancy, 'ReadSenderABLInfo');
  req.destination = addr;
  req.address = AddressMapping.SenderABLtionAddr;
  return req;
}
Session.prototype.ReadSenderABLInfo = async function ReadSenderABLInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSenderABLInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSenderABLInfo = async function tryReadSenderABLInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSenderABLInfo(addr);
  return this.connection.trySend(req);
};
