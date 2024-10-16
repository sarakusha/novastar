import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFlagEnableAccelerate(addr: number, bBroadcast: boolean, isOpen: boolean): Promise<void>;
    trySetFlagEnableAccelerate(addr: number, isOpen: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetFlagEnableAccelerate<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isOpen: boolean
): Request<Broadcast> {
  const req = new Request(isOpen ? [1] : [0], bBroadcast, 'SetFlagEnableAccelerate');
  req.destination = addr;
  req.address = AddressMapping.Sender_SetFlagForRemove3SecondAddr;
  return req;
}
Session.prototype.SetFlagEnableAccelerate = async function SetFlagEnableAccelerate(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  isOpen: boolean
): Promise<void> {
  const req = createSetFlagEnableAccelerate(addr, bBroadcast, isOpen);
  await this.connection.send(req);
};
Session.prototype.trySetFlagEnableAccelerate = async function trySetFlagEnableAccelerate(
  this: Session,
  addr: number,
  isOpen: boolean
): Promise<ErrorType | null> {
  const req = createSetFlagEnableAccelerate(addr, false, isOpen);
  return (await this.connection.trySend(req))?.ack ?? null;
};
