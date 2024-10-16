import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviWidth(addr: number, bBroadcast: boolean, dviWidth: number, index: number): Promise<void>;
    trySetDviWidth(addr: number, dviWidth: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetDviWidth<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviWidth: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviWidth, AddressMapping.DviWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviWidth');
  req.destination = addr;
  req.address = AddressMapping.DviWidthAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.SetDviWidth = async function SetDviWidth(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviWidth: number,
  index: number
): Promise<void> {
  const req = createSetDviWidth(addr, bBroadcast, dviWidth, index);
  await this.connection.send(req);
};
Session.prototype.trySetDviWidth = async function trySetDviWidth(
  this: Session,
  addr: number,
  dviWidth: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetDviWidth(addr, false, dviWidth, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
