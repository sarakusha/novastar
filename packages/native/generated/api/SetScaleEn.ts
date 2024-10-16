import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScaleEn(addr: number, bBroadcast: boolean, isEnableScale: boolean): Promise<void>;
    trySetScaleEn(addr: number, isEnableScale: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetScaleEn<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isEnableScale: boolean
): Request<Broadcast> {
  const req = new Request(isEnableScale ? [88] : [255], bBroadcast, 'SetScaleEn');
  req.destination = addr;
  req.address = AddressMapping.DVIScaleEnAddr;
  return req;
}
Session.prototype.SetScaleEn = async function SetScaleEn(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  isEnableScale: boolean
): Promise<void> {
  const req = createSetScaleEn(addr, bBroadcast, isEnableScale);
  await this.connection.send(req);
};
Session.prototype.trySetScaleEn = async function trySetScaleEn(
  this: Session,
  addr: number,
  isEnableScale: boolean
): Promise<ErrorType | null> {
  const req = createSetScaleEn(addr, false, isEnableScale);
  return (await this.connection.trySend(req))?.ack ?? null;
};
