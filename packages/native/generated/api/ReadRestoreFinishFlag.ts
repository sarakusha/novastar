import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRestoreFinishFlag(addr: number, length: number): Promise<Buffer>;
    tryReadRestoreFinishFlag(addr: number, length: number): Promise<Packet | null>;
  }
}
export default function createReadRestoreFinishFlag(addr: number, length: number): Request {
  const req = new Request(length, 'ReadRestoreFinishFlag');
  req.destination = addr;
  req.address = AddressMapping.RestoreFinishFlagAddr;
  return req;
}
Session.prototype.ReadRestoreFinishFlag = async function ReadRestoreFinishFlag(
  this: Session,
  addr: number,
  length: number
): Promise<Buffer> {
  const req = createReadRestoreFinishFlag(addr, length);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadRestoreFinishFlag = async function tryReadRestoreFinishFlag(
  this: Session,
  addr: number,
  length: number
): Promise<Packet | null> {
  const req = createReadRestoreFinishFlag(addr, length);
  return this.connection.trySend(req);
};
