import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLoadMode(addr: number): Promise<number>;
    tryReadLoadMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadLoadMode(addr: number): Request {
  const req = new Request(AddressMapping.LoadModeOccupancy, 'ReadLoadMode');
  req.destination = addr;
  req.address = AddressMapping.LoadModeAddr;
  return req;
}
Session.prototype.ReadLoadMode = async function ReadLoadMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadLoadMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLoadMode = async function tryReadLoadMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadLoadMode(addr);
  return this.connection.trySend(req);
};
