import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRealDviWidth(addr: number, bBroadcast: boolean, dviWidth: number): Promise<void>;
    trySetRealDviWidth(addr: number, dviWidth: number): Promise<ErrorType | null>;
  }
}
export default function createSetRealDviWidth<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviWidth: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviWidth, AddressMapping.RealDviWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetRealDviWidth');
  req.destination = addr;
  req.address = AddressMapping.RealDviWidthAddr;
  return req;
}
Session.prototype.SetRealDviWidth = async function SetRealDviWidth(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviWidth: number
): Promise<void> {
  const req = createSetRealDviWidth(addr, bBroadcast, dviWidth);
  await this.connection.send(req);
};
Session.prototype.trySetRealDviWidth = async function trySetRealDviWidth(
  this: Session,
  addr: number,
  dviWidth: number
): Promise<ErrorType | null> {
  const req = createSetRealDviWidth(addr, false, dviWidth);
  return (await this.connection.trySend(req))?.ack ?? null;
};
