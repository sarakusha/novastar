import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviMode(addr: number, bBroadcast: boolean, dviMode: number): Promise<void>;
    trySetDviMode(addr: number, dviMode: number): Promise<ErrorType | null>;
  }
}
export default function createSetDviMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviMode, AddressMapping.DviModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviMode');
  req.destination = addr;
  req.address = AddressMapping.DviModeAddr;
  return req;
}
Session.prototype.SetDviMode = async function SetDviMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviMode: number
): Promise<void> {
  const req = createSetDviMode(addr, bBroadcast, dviMode);
  await this.connection.send(req);
};
Session.prototype.trySetDviMode = async function trySetDviMode(
  this: Session,
  addr: number,
  dviMode: number
): Promise<ErrorType | null> {
  const req = createSetDviMode(addr, false, dviMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
