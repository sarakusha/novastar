import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSenderConrectionMode(addr: number, bBroadcast: boolean, isOpen: boolean): Promise<void>;
    trySetSenderConrectionMode(addr: number, isOpen: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSenderConrectionMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isOpen: boolean
): Request<Broadcast> {
  const req = new Request(isOpen ? [168] : [0], bBroadcast, 'SetSenderConrectionMode');
  req.destination = addr;
  req.address = AddressMapping.SenderCorrectionModeAddr;
  return req;
}
Session.prototype.SetSenderConrectionMode = async function SetSenderConrectionMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  isOpen: boolean
): Promise<void> {
  const req = createSetSenderConrectionMode(addr, bBroadcast, isOpen);
  await this.connection.send(req);
};
Session.prototype.trySetSenderConrectionMode = async function trySetSenderConrectionMode(
  this: Session,
  addr: number,
  isOpen: boolean
): Promise<ErrorType | null> {
  const req = createSetSenderConrectionMode(addr, false, isOpen);
  return (await this.connection.trySend(req))?.ack ?? null;
};
