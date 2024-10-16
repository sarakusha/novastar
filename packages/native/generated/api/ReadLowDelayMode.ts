import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLowDelayMode(addr: number): Promise<number>;
    tryReadLowDelayMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadLowDelayMode(addr: number): Request {
  const req = new Request(AddressMapping.LowDelayOccupancy, 'ReadLowDelayMode');
  req.destination = addr;
  req.address = AddressMapping.LowDelayAddr;
  return req;
}
Session.prototype.ReadLowDelayMode = async function ReadLowDelayMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadLowDelayMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLowDelayMode = async function tryReadLowDelayMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadLowDelayMode(addr);
  return this.connection.trySend(req);
};
