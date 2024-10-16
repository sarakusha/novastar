import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_BackUpTestMode(
      addr: number,
      bBroadcast: boolean,
      backUpTestMode: boolean
    ): Promise<void>;
    trySetSender_BackUpTestMode(addr: number, backUpTestMode: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSender_BackUpTestMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  backUpTestMode: boolean
): Request<Broadcast> {
  const req = new Request(backUpTestMode ? [1] : [0], bBroadcast, 'SetSender_BackUpTestMode');
  req.destination = addr;
  req.address = AddressMapping.BackUpTestModeAddr;
  return req;
}
Session.prototype.SetSender_BackUpTestMode = async function SetSender_BackUpTestMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  backUpTestMode: boolean
): Promise<void> {
  const req = createSetSender_BackUpTestMode(addr, bBroadcast, backUpTestMode);
  await this.connection.send(req);
};
Session.prototype.trySetSender_BackUpTestMode = async function trySetSender_BackUpTestMode(
  this: Session,
  addr: number,
  backUpTestMode: boolean
): Promise<ErrorType | null> {
  const req = createSetSender_BackUpTestMode(addr, false, backUpTestMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
