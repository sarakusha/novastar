import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllPortOffsetX(addr: number, index: number): Promise<Buffer>;
    tryReadAllPortOffsetX(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadAllPortOffsetX(addr: number, index: number): Request {
  const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortOffsetX');
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr + AddressMapping.PortOccupancy * index;
  return req;
}
Session.prototype.ReadAllPortOffsetX = async function ReadAllPortOffsetX(
  this: Session,
  addr: number,
  index: number
): Promise<Buffer> {
  const req = createReadAllPortOffsetX(addr, index);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllPortOffsetX = async function tryReadAllPortOffsetX(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadAllPortOffsetX(addr, index);
  return this.connection.trySend(req);
};
