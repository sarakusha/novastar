import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSenderLowDelayEnable(
      addr: number,
      bBroadcast: boolean,
      enableLowDelay: boolean
    ): Promise<void>;
    trySetSenderLowDelayEnable(addr: number, enableLowDelay: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSenderLowDelayEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  enableLowDelay: boolean
): Request<Broadcast> {
  const req = new Request(enableLowDelay ? [120] : [0], bBroadcast, 'SetSenderLowDelayEnable');
  req.destination = addr;
  req.address = AddressMapping.LowDelayAddr;
  return req;
}
Session.prototype.SetSenderLowDelayEnable = async function SetSenderLowDelayEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  enableLowDelay: boolean
): Promise<void> {
  const req = createSetSenderLowDelayEnable(addr, bBroadcast, enableLowDelay);
  await this.connection.send(req);
};
Session.prototype.trySetSenderLowDelayEnable = async function trySetSenderLowDelayEnable(
  this: Session,
  addr: number,
  enableLowDelay: boolean
): Promise<ErrorType | null> {
  const req = createSetSenderLowDelayEnable(addr, false, enableLowDelay);
  return (await this.connection.trySend(req))?.ack ?? null;
};
