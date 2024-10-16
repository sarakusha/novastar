import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFieldRateMode(addr: number, bBroadcast: boolean, fieldRateMode: number): Promise<void>;
    trySetFieldRateMode(addr: number, fieldRateMode: number): Promise<ErrorType | null>;
  }
}
export default function createSetFieldRateMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  fieldRateMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fieldRateMode, AddressMapping.FieldRateModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetFieldRateMode');
  req.destination = addr;
  req.address = AddressMapping.FieldRateModeAddr;
  return req;
}
Session.prototype.SetFieldRateMode = async function SetFieldRateMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  fieldRateMode: number
): Promise<void> {
  const req = createSetFieldRateMode(addr, bBroadcast, fieldRateMode);
  await this.connection.send(req);
};
Session.prototype.trySetFieldRateMode = async function trySetFieldRateMode(
  this: Session,
  addr: number,
  fieldRateMode: number
): Promise<ErrorType | null> {
  const req = createSetFieldRateMode(addr, false, fieldRateMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
