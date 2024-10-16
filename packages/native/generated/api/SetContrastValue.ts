import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetContrastValue(addr: number, bBroadcast: boolean, dht: number): Promise<void>;
    trySetContrastValue(addr: number, dht: number): Promise<ErrorType | null>;
  }
}
export default function createSetContrastValue<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dht: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dht, AddressMapping.SenderContrastResultOccupancy);
  const req = new Request($data, bBroadcast, 'SetContrastValue');
  req.destination = addr;
  req.address = AddressMapping.SenderContrastResultAddr;
  return req;
}
Session.prototype.SetContrastValue = async function SetContrastValue(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dht: number
): Promise<void> {
  const req = createSetContrastValue(addr, bBroadcast, dht);
  await this.connection.send(req);
};
Session.prototype.trySetContrastValue = async function trySetContrastValue(
  this: Session,
  addr: number,
  dht: number
): Promise<ErrorType | null> {
  const req = createSetContrastValue(addr, false, dht);
  return (await this.connection.trySend(req))?.ack ?? null;
};
