import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBackUpFileHeader(addr: number): Promise<Buffer>;
    tryReadBackUpFileHeader(addr: number): Promise<Packet | null>;
  }
}
export default function createReadBackUpFileHeader(addr: number): Request {
  const req = new Request(AddressMapping.BackUpFileHeaderAddrOccupancy, 'ReadBackUpFileHeader');
  req.destination = addr;
  req.address = AddressMapping.BackUpFileHeaderAddr;
  return req;
}
Session.prototype.ReadBackUpFileHeader = async function ReadBackUpFileHeader(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadBackUpFileHeader(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadBackUpFileHeader = async function tryReadBackUpFileHeader(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadBackUpFileHeader(addr);
  return this.connection.trySend(req);
};
