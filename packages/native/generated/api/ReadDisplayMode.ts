import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDisplayMode(addr: number): Promise<number>;
    tryReadDisplayMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDisplayMode(addr: number): Request {
  const req = new Request(AddressMapping.DisplayModeOccupancy, 'ReadDisplayMode');
  req.destination = addr;
  req.address = AddressMapping.DisplayModeAddr;
  return req;
}
Session.prototype.ReadDisplayMode = async function ReadDisplayMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDisplayMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDisplayMode = async function tryReadDisplayMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDisplayMode(addr);
  return this.connection.trySend(req);
};
