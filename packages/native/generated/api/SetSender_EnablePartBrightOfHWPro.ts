import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnablePartBrightOfHWPro(
      addr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetSender_EnablePartBrightOfHWPro(
      addr: number,
      isEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnablePartBrightOfHWPro<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnablePartBrightOfHWPro');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnablePartOfBrightAddr;
  return req;
}
Session.prototype.SetSender_EnablePartBrightOfHWPro =
  async function SetSender_EnablePartBrightOfHWPro(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = createSetSender_EnablePartBrightOfHWPro(addr, bBroadcast, isEnable);
    await this.connection.send(req);
  };
Session.prototype.trySetSender_EnablePartBrightOfHWPro =
  async function trySetSender_EnablePartBrightOfHWPro(
    this: Session,
    addr: number,
    isEnable: boolean
  ): Promise<ErrorType | null> {
    const req = createSetSender_EnablePartBrightOfHWPro(addr, false, isEnable);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
