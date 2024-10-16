import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetShowNormal(addr: number, bBroadcast: boolean, data: number): Promise<void>;
    trySetShowNormal(addr: number, data: number): Promise<ErrorType | null>;
  }
}
export default function createSetShowNormal<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const $data = encodeUIntLE(data, AddressMapping.ShowNormalOccupancy);
  const req = new Request($data, bBroadcast, 'SetShowNormal');
  req.destination = addr;
  req.address = AddressMapping.ShowNormalAddr;
  return req;
}
Session.prototype.SetShowNormal = async function SetShowNormal(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetShowNormal(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetShowNormal = async function trySetShowNormal(
  this: Session,
  addr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetShowNormal(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
