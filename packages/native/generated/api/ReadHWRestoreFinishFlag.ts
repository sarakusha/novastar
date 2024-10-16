import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHWRestoreFinishFlag(addr: number, length: number): Promise<Buffer>;
    tryReadHWRestoreFinishFlag(addr: number, length: number): Promise<Packet | null>;
  }
}
export default function createReadHWRestoreFinishFlag(addr: number, length: number): Request {
  const req = new Request(length, 'ReadHWRestoreFinishFlag');
  req.destination = addr;
  req.address = AddressMapping.HWRestoreFinishFlagAddr;
  return req;
}
Session.prototype.ReadHWRestoreFinishFlag = async function ReadHWRestoreFinishFlag(
  this: Session,
  addr: number,
  length: number
): Promise<Buffer> {
  const req = createReadHWRestoreFinishFlag(addr, length);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadHWRestoreFinishFlag = async function tryReadHWRestoreFinishFlag(
  this: Session,
  addr: number,
  length: number
): Promise<Packet | null> {
  const req = createReadHWRestoreFinishFlag(addr, length);
  return this.connection.trySend(req);
};
