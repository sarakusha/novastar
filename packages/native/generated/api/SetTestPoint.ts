import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTestPoint(addr: number, bBroadcast: boolean, testPoint: number): Promise<void>;
    trySetTestPoint(addr: number, testPoint: number): Promise<ErrorType | null>;
  }
}
export default function createSetTestPoint<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  testPoint: number
): Request<Broadcast> {
  const $data = encodeUIntLE(testPoint, AddressMapping.SortOrderOccupancy);
  const req = new Request($data, bBroadcast, 'SetTestPoint');
  req.destination = addr;
  req.address = AddressMapping.SortOrderAddr;
  return req;
}
Session.prototype.SetTestPoint = async function SetTestPoint(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  testPoint: number
): Promise<void> {
  const req = createSetTestPoint(addr, bBroadcast, testPoint);
  await this.connection.send(req);
};
Session.prototype.trySetTestPoint = async function trySetTestPoint(
  this: Session,
  addr: number,
  testPoint: number
): Promise<ErrorType | null> {
  const req = createSetTestPoint(addr, false, testPoint);
  return (await this.connection.trySend(req))?.ack ?? null;
};
