import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDvi1Dvi0OffsetX(addr: number, bBroadcast: boolean, dvi1Dvi0OffsetX: number): Promise<void>;
    trySetDvi1Dvi0OffsetX(addr: number, dvi1Dvi0OffsetX: number): Promise<ErrorType | null>;
  }
}
export default function createSetDvi1Dvi0OffsetX<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dvi1Dvi0OffsetX: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dvi1Dvi0OffsetX, AddressMapping.Dvi1Dvi0OffsetXOccupancy);
  const req = new Request($data, bBroadcast, 'SetDvi1Dvi0OffsetX');
  req.destination = addr;
  req.address = AddressMapping.Dvi1Dvi0OffsetXAddr;
  return req;
}
Session.prototype.SetDvi1Dvi0OffsetX = async function SetDvi1Dvi0OffsetX(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dvi1Dvi0OffsetX: number
): Promise<void> {
  const req = createSetDvi1Dvi0OffsetX(addr, bBroadcast, dvi1Dvi0OffsetX);
  await this.connection.send(req);
};
Session.prototype.trySetDvi1Dvi0OffsetX = async function trySetDvi1Dvi0OffsetX(
  this: Session,
  addr: number,
  dvi1Dvi0OffsetX: number
): Promise<ErrorType | null> {
  const req = createSetDvi1Dvi0OffsetX(addr, false, dvi1Dvi0OffsetX);
  return (await this.connection.trySend(req))?.ack ?? null;
};
