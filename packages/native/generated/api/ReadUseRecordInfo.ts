import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadUseRecordInfo(addr: number, offaddr: number): Promise<Buffer>;
    tryReadUseRecordInfo(addr: number, offaddr: number): Promise<Packet | null>;
  }
}
export default function createReadUseRecordInfo(addr: number, offaddr: number): Request {
  const req = new Request(AddressMapping.UseRecordInfoOccupancy, 'ReadUseRecordInfo');
  req.destination = addr;
  req.address = AddressMapping.UseRecordInfoAddr + offaddr;
  return req;
}
Session.prototype.ReadUseRecordInfo = async function ReadUseRecordInfo(
  this: Session,
  addr: number,
  offaddr: number
): Promise<Buffer> {
  const req = createReadUseRecordInfo(addr, offaddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadUseRecordInfo = async function tryReadUseRecordInfo(
  this: Session,
  addr: number,
  offaddr: number
): Promise<Packet | null> {
  const req = createReadUseRecordInfo(addr, offaddr);
  return this.connection.trySend(req);
};
