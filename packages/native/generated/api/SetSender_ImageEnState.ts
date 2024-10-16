import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ImageEnState(addr: number, bBroadcast: boolean, info: number): Promise<void>;
    trySetSender_ImageEnState(addr: number, info: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ImageEnState<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  info: number
): Request<Broadcast> {
  const req = new Request([info], bBroadcast, 'SetSender_ImageEnState');
  req.destination = addr;
  req.address = AddressMapping.SenderABLOpreationAddr;
  return req;
}
Session.prototype.SetSender_ImageEnState = async function SetSender_ImageEnState(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  info: number
): Promise<void> {
  const req = createSetSender_ImageEnState(addr, bBroadcast, info);
  await this.connection.send(req);
};
Session.prototype.trySetSender_ImageEnState = async function trySetSender_ImageEnState(
  this: Session,
  addr: number,
  info: number
): Promise<ErrorType | null> {
  const req = createSetSender_ImageEnState(addr, false, info);
  return (await this.connection.trySend(req))?.ack ?? null;
};
