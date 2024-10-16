import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllScaleInfo(addr: number): Promise<Buffer>;
    tryReadAllScaleInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadAllScaleInfo(addr: number): Request {
  const req = new Request(AddressMapping.AllScaleInfoOccupancy, 'ReadAllScaleInfo');
  req.destination = addr;
  req.address = AddressMapping.AllScaleInfoAddr;
  return req;
}
Session.prototype.ReadAllScaleInfo = async function ReadAllScaleInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadAllScaleInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllScaleInfo = async function tryReadAllScaleInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadAllScaleInfo(addr);
  return this.connection.trySend(req);
};
