import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDvi1Dvi0OffsetY(addr: number, bBroadcast: boolean, dvi1Dvi0OffsetY: number): Promise<void>;
    trySetDvi1Dvi0OffsetY(addr: number, dvi1Dvi0OffsetY: number): Promise<ErrorType | null>;
  }
}
export default function createSetDvi1Dvi0OffsetY<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dvi1Dvi0OffsetY: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dvi1Dvi0OffsetY, AddressMapping.Dvi1Dvi0OffsetYOccupancy);
  const req = new Request($data, bBroadcast, 'SetDvi1Dvi0OffsetY');
  req.destination = addr;
  req.address = AddressMapping.Dvi1Dvi0OffsetYAddr;
  return req;
}
Session.prototype.SetDvi1Dvi0OffsetY = async function SetDvi1Dvi0OffsetY(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dvi1Dvi0OffsetY: number
): Promise<void> {
  const req = createSetDvi1Dvi0OffsetY(addr, bBroadcast, dvi1Dvi0OffsetY);
  await this.connection.send(req);
};
Session.prototype.trySetDvi1Dvi0OffsetY = async function trySetDvi1Dvi0OffsetY(
  this: Session,
  addr: number,
  dvi1Dvi0OffsetY: number
): Promise<ErrorType | null> {
  const req = createSetDvi1Dvi0OffsetY(addr, false, dvi1Dvi0OffsetY);
  return (await this.connection.trySend(req))?.ack ?? null;
};
