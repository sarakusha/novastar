import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSortOrder(addr: number, bBroadcast: boolean, sortOrder: number): Promise<void>;
    trySetSortOrder(addr: number, sortOrder: number): Promise<ErrorType | null>;
  }
}
export default function createSetSortOrder<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  sortOrder: number
): Request<Broadcast> {
  const $data = encodeUIntLE(sortOrder, AddressMapping.SortOrderOccupancy);
  const req = new Request($data, bBroadcast, 'SetSortOrder');
  req.destination = addr;
  req.address = AddressMapping.SortOrderAddr;
  return req;
}
Session.prototype.SetSortOrder = async function SetSortOrder(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  sortOrder: number
): Promise<void> {
  const req = createSetSortOrder(addr, bBroadcast, sortOrder);
  await this.connection.send(req);
};
Session.prototype.trySetSortOrder = async function trySetSortOrder(
  this: Session,
  addr: number,
  sortOrder: number
): Promise<ErrorType | null> {
  const req = createSetSortOrder(addr, false, sortOrder);
  return (await this.connection.trySend(req))?.ack ?? null;
};
