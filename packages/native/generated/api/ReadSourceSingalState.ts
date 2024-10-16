import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSourceSingalState(addr: number): Promise<number>;
    tryReadSourceSingalState(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSourceSingalState(addr: number): Request {
  const req = new Request(AddressMapping.SourceSingalStateOccupancy, 'ReadSourceSingalState');
  req.destination = addr;
  req.address = AddressMapping.SourceSingalStateAddr;
  return req;
}
Session.prototype.ReadSourceSingalState = async function ReadSourceSingalState(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSourceSingalState(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSourceSingalState = async function tryReadSourceSingalState(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSourceSingalState(addr);
  return this.connection.trySend(req);
};
