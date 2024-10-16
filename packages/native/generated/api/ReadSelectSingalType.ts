import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSelectSingalType(addr: number): Promise<number>;
    tryReadSelectSingalType(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSelectSingalType(addr: number): Request {
  const req = new Request(AddressMapping.SelectSingalTypeOccupancy, 'ReadSelectSingalType');
  req.destination = addr;
  req.address = AddressMapping.SourceSelectSingalBitAddr;
  return req;
}
Session.prototype.ReadSelectSingalType = async function ReadSelectSingalType(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSelectSingalType(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSelectSingalType = async function tryReadSelectSingalType(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSelectSingalType(addr);
  return this.connection.trySend(req);
};
