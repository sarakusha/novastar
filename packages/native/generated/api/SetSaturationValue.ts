import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSaturationValue(addr: number, bBroadcast: boolean, dht: number): Promise<void>;
    trySetSaturationValue(addr: number, dht: number): Promise<ErrorType | null>;
  }
}
export default function createSetSaturationValue<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dht: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dht, AddressMapping.SenderSaturationResultOccupancy);
  const req = new Request($data, bBroadcast, 'SetSaturationValue');
  req.destination = addr;
  req.address = AddressMapping.SenderSaturationResultAddr;
  return req;
}
Session.prototype.SetSaturationValue = async function SetSaturationValue(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dht: number
): Promise<void> {
  const req = createSetSaturationValue(addr, bBroadcast, dht);
  await this.connection.send(req);
};
Session.prototype.trySetSaturationValue = async function trySetSaturationValue(
  this: Session,
  addr: number,
  dht: number
): Promise<ErrorType | null> {
  const req = createSetSaturationValue(addr, false, dht);
  return (await this.connection.trySend(req))?.ack ?? null;
};
