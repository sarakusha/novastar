import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviSelect(addr: number): Promise<number>;
    tryReadDviSelect(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDviSelect(addr: number): Request {
  const req = new Request(AddressMapping.DviSelectOccupancy, 'ReadDviSelect');
  req.destination = addr;
  req.address = AddressMapping.DviSelectAddr;
  return req;
}
Session.prototype.ReadDviSelect = async function ReadDviSelect(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDviSelect(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviSelect = async function tryReadDviSelect(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDviSelect(addr);
  return this.connection.trySend(req);
};
