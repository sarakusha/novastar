import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRtco(addr: number): Promise<Buffer>;
    tryReadRtco(addr: number): Promise<Packet | null>;
  }
}
export default function createReadRtco(addr: number): Request {
  const req = new Request(AddressMapping.RtcoOccupancy, 'ReadRtco');
  req.destination = addr;
  req.address = AddressMapping.RtcoAddr;
  return req;
}
Session.prototype.ReadRtco = async function ReadRtco(this: Session, addr: number): Promise<Buffer> {
  const req = createReadRtco(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadRtco = async function tryReadRtco(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadRtco(addr);
  return this.connection.trySend(req);
};
