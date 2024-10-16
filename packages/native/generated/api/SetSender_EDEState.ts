import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EDEState(addr: number, bBroadcast: boolean, info: number): Promise<void>;
    trySetSender_EDEState(addr: number, info: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EDEState<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  info: number
): Request<Broadcast> {
  const req = new Request([info], bBroadcast, 'SetSender_EDEState');
  req.destination = addr;
  req.address = AddressMapping.SenderEDEOpreationAddr;
  return req;
}
Session.prototype.SetSender_EDEState = async function SetSender_EDEState(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  info: number
): Promise<void> {
  const req = createSetSender_EDEState(addr, bBroadcast, info);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EDEState = async function trySetSender_EDEState(
  this: Session,
  addr: number,
  info: number
): Promise<ErrorType | null> {
  const req = createSetSender_EDEState(addr, false, info);
  return (await this.connection.trySend(req))?.ack ?? null;
};
