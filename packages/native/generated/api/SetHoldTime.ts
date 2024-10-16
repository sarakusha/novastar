import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetHoldTime(addr: number, bBroadcast: boolean, holdTimeSec: number): Promise<void>;
    trySetHoldTime(addr: number, holdTimeSec: number): Promise<ErrorType | null>;
  }
}
export default function createSetHoldTime<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  holdTimeSec: number
): Request<Broadcast> {
  const $data = encodeUIntLE(holdTimeSec, AddressMapping.HoldTimeOccupancy);
  const req = new Request($data, bBroadcast, 'SetHoldTime');
  req.destination = addr;
  req.address = AddressMapping.HoldTimeAddr;
  return req;
}
Session.prototype.SetHoldTime = async function SetHoldTime(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  holdTimeSec: number
): Promise<void> {
  const req = createSetHoldTime(addr, bBroadcast, holdTimeSec);
  await this.connection.send(req);
};
Session.prototype.trySetHoldTime = async function trySetHoldTime(
  this: Session,
  addr: number,
  holdTimeSec: number
): Promise<ErrorType | null> {
  const req = createSetHoldTime(addr, false, holdTimeSec);
  return (await this.connection.trySend(req))?.ack ?? null;
};
