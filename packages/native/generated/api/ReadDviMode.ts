import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviMode(addr: number): Promise<number>;
    tryReadDviMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDviMode(addr: number): Request {
  const req = new Request(AddressMapping.DviModeOccupancy, 'ReadDviMode');
  req.destination = addr;
  req.address = AddressMapping.DviModeAddr;
  return req;
}
Session.prototype.ReadDviMode = async function ReadDviMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDviMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviMode = async function tryReadDviMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDviMode(addr);
  return this.connection.trySend(req);
};
