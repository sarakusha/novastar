import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviOffsetX(
      addr: number,
      bBroadcast: boolean,
      dviOffsetX: number,
      index: number
    ): Promise<void>;
    trySetDviOffsetX(addr: number, dviOffsetX: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetDviOffsetX<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviOffsetX: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviOffsetX, AddressMapping.DviOffsetXOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviOffsetX');
  req.destination = addr;
  req.address = AddressMapping.DviOffsetXAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.SetDviOffsetX = async function SetDviOffsetX(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviOffsetX: number,
  index: number
): Promise<void> {
  const req = createSetDviOffsetX(addr, bBroadcast, dviOffsetX, index);
  await this.connection.send(req);
};
Session.prototype.trySetDviOffsetX = async function trySetDviOffsetX(
  this: Session,
  addr: number,
  dviOffsetX: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetDviOffsetX(addr, false, dviOffsetX, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
