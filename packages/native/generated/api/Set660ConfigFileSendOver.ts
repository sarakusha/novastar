import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set660ConfigFileSendOver(addr: number, bBroadcast: boolean, data: number): Promise<void>;
    trySet660ConfigFileSendOver(addr: number, data: number): Promise<ErrorType | null>;
  }
}
export default function createSet660ConfigFileSendOver<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const $data = encodeUIntLE(data, AddressMapping.Sender660ConfigFileSendOverOccupancy);
  const req = new Request($data, bBroadcast, 'Set660ConfigFileSendOver');
  req.destination = addr;
  req.address = AddressMapping.Sender660ConfigFileSendOverAddr;
  return req;
}
Session.prototype.Set660ConfigFileSendOver = async function Set660ConfigFileSendOver(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSet660ConfigFileSendOver(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySet660ConfigFileSendOver = async function trySet660ConfigFileSendOver(
  this: Session,
  addr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSet660ConfigFileSendOver(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
