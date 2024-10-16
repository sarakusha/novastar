import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSortOrder(addr: number): Promise<number>;
    tryReadSortOrder(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSortOrder(addr: number): Request {
  const req = new Request(AddressMapping.SortOrderOccupancy, 'ReadSortOrder');
  req.destination = addr;
  req.address = AddressMapping.SortOrderAddr;
  return req;
}
Session.prototype.ReadSortOrder = async function ReadSortOrder(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSortOrder(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSortOrder = async function tryReadSortOrder(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSortOrder(addr);
  return this.connection.trySend(req);
};
