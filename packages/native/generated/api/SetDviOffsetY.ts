import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviOffsetY(
      addr: number,
      bBroadcast: boolean,
      dviOffsetY: number,
      index: number
    ): Promise<void>;
    trySetDviOffsetY(addr: number, dviOffsetY: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetDviOffsetY<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviOffsetY: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviOffsetY, AddressMapping.DviOffsetYOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviOffsetY');
  req.destination = addr;
  req.address = AddressMapping.DviOffsetYAddr + AddressMapping.DviOccupancy * index;
  return req;
}
Session.prototype.SetDviOffsetY = async function SetDviOffsetY(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviOffsetY: number,
  index: number
): Promise<void> {
  const req = createSetDviOffsetY(addr, bBroadcast, dviOffsetY, index);
  await this.connection.send(req);
};
Session.prototype.trySetDviOffsetY = async function trySetDviOffsetY(
  this: Session,
  addr: number,
  dviOffsetY: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetDviOffsetY(addr, false, dviOffsetY, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
