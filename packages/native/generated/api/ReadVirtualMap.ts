import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVirtualMap(addr: number): Promise<number>;
    tryReadVirtualMap(addr: number): Promise<Packet | null>;
  }
}
export default function createReadVirtualMap(addr: number): Request {
  const req = new Request(AddressMapping.VirtualMapOccupancy, 'ReadVirtualMap');
  req.destination = addr;
  req.address = AddressMapping.VirtualMapAddr;
  return req;
}
Session.prototype.ReadVirtualMap = async function ReadVirtualMap(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadVirtualMap(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVirtualMap = async function tryReadVirtualMap(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadVirtualMap(addr);
  return this.connection.trySend(req);
};
