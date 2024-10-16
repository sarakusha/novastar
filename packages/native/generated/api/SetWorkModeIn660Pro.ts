import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetWorkModeIn660Pro(addr: number, bBroadcast: boolean, data: number): Promise<void>;
    trySetWorkModeIn660Pro(addr: number, data: number): Promise<ErrorType | null>;
  }
}
export default function createSetWorkModeIn660Pro<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetWorkModeIn660Pro');
  req.destination = addr;
  req.address = AddressMapping.WorkModeIn660ProAddr;
  return req;
}
Session.prototype.SetWorkModeIn660Pro = async function SetWorkModeIn660Pro(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetWorkModeIn660Pro(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetWorkModeIn660Pro = async function trySetWorkModeIn660Pro(
  this: Session,
  addr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetWorkModeIn660Pro(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
