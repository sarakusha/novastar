import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetToneValue(addr: number, bBroadcast: boolean, dht: number): Promise<void>;
    trySetToneValue(addr: number, dht: number): Promise<ErrorType | null>;
  }
}
export default function createSetToneValue<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dht: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dht, AddressMapping.SenderToneResultOccupancy);
  const req = new Request($data, bBroadcast, 'SetToneValue');
  req.destination = addr;
  req.address = AddressMapping.SenderToneResultddr;
  return req;
}
Session.prototype.SetToneValue = async function SetToneValue(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dht: number
): Promise<void> {
  const req = createSetToneValue(addr, bBroadcast, dht);
  await this.connection.send(req);
};
Session.prototype.trySetToneValue = async function trySetToneValue(
  this: Session,
  addr: number,
  dht: number
): Promise<ErrorType | null> {
  const req = createSetToneValue(addr, false, dht);
  return (await this.connection.trySend(req))?.ack ?? null;
};
