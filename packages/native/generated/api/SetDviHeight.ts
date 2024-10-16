import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviHeight(
      addr: number,
      bBroadcast: boolean,
      dvi0Height: number,
      index: number
    ): Promise<void>;
    trySetDviHeight(addr: number, dvi0Height: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetDviHeight<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dvi0Height: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dvi0Height, AddressMapping.DviHeightOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviHeight');
  req.destination = addr;
  req.address = AddressMapping.DviHeightAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.SetDviHeight = async function SetDviHeight(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dvi0Height: number,
  index: number
): Promise<void> {
  const req = createSetDviHeight(addr, bBroadcast, dvi0Height, index);
  await this.connection.send(req);
};
Session.prototype.trySetDviHeight = async function trySetDviHeight(
  this: Session,
  addr: number,
  dvi0Height: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetDviHeight(addr, false, dvi0Height, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
