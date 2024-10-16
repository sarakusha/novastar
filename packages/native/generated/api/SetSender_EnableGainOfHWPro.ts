import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableGainOfHWPro(
      addr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetSender_EnableGainOfHWPro(addr: number, isEnable: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableGainOfHWPro<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnableGainOfHWPro');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableGainAddr;
  return req;
}
Session.prototype.SetSender_EnableGainOfHWPro = async function SetSender_EnableGainOfHWPro(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  isEnable: boolean
): Promise<void> {
  const req = createSetSender_EnableGainOfHWPro(addr, bBroadcast, isEnable);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EnableGainOfHWPro = async function trySetSender_EnableGainOfHWPro(
  this: Session,
  addr: number,
  isEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetSender_EnableGainOfHWPro(addr, false, isEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
