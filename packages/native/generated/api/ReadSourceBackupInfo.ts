import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSourceBackupInfo(addr: number, readLength: number): Promise<Buffer>;
    tryReadSourceBackupInfo(addr: number, readLength: number): Promise<Packet | null>;
  }
}
export default function createReadSourceBackupInfo(addr: number, readLength: number): Request {
  const req = new Request(readLength, 'ReadSourceBackupInfo');
  req.destination = addr;
  req.address = AddressMapping.SourceBackupAddr;
  return req;
}
Session.prototype.ReadSourceBackupInfo = async function ReadSourceBackupInfo(
  this: Session,
  addr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadSourceBackupInfo(addr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSourceBackupInfo = async function tryReadSourceBackupInfo(
  this: Session,
  addr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadSourceBackupInfo(addr, readLength);
  return this.connection.trySend(req);
};
