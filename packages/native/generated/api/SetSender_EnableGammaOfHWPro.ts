import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableGammaOfHWPro(
      addr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetSender_EnableGammaOfHWPro(addr: number, isEnable: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableGammaOfHWPro<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnableGammaOfHWPro');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableGammaAddr;
  return req;
}
Session.prototype.SetSender_EnableGammaOfHWPro = async function SetSender_EnableGammaOfHWPro(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  isEnable: boolean
): Promise<void> {
  const req = createSetSender_EnableGammaOfHWPro(addr, bBroadcast, isEnable);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EnableGammaOfHWPro = async function trySetSender_EnableGammaOfHWPro(
  this: Session,
  addr: number,
  isEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetSender_EnableGammaOfHWPro(addr, false, isEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
