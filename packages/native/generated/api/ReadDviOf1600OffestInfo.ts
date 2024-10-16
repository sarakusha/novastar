import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviOf1600OffestInfo(addr: number): Promise<Buffer>;
    tryReadDviOf1600OffestInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDviOf1600OffestInfo(addr: number): Request {
  const req = new Request(16, 'ReadDviOf1600OffestInfo');
  req.destination = addr;
  req.address = AddressMapping.DVIOfOffsetInfoAddr;
  return req;
}
Session.prototype.ReadDviOf1600OffestInfo = async function ReadDviOf1600OffestInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadDviOf1600OffestInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadDviOf1600OffestInfo = async function tryReadDviOf1600OffestInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDviOf1600OffestInfo(addr);
  return this.connection.trySend(req);
};
