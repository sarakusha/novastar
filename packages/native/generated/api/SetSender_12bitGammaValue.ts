import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_12bitGammaValue(addr: number, bBroadcast: boolean, gammaValue: number): Promise<void>;
    trySetSender_12bitGammaValue(addr: number, gammaValue: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_12bitGammaValue<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  gammaValue: number
): Request<Broadcast> {
  const req = new Request([gammaValue], bBroadcast, 'SetSender_12bitGammaValue');
  req.destination = addr;
  req.address = AddressMapping.Sender_12bitGammaValueAddr;
  return req;
}
Session.prototype.SetSender_12bitGammaValue = async function SetSender_12bitGammaValue(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  gammaValue: number
): Promise<void> {
  const req = createSetSender_12bitGammaValue(addr, bBroadcast, gammaValue);
  await this.connection.send(req);
};
Session.prototype.trySetSender_12bitGammaValue = async function trySetSender_12bitGammaValue(
  this: Session,
  addr: number,
  gammaValue: number
): Promise<ErrorType | null> {
  const req = createSetSender_12bitGammaValue(addr, false, gammaValue);
  return (await this.connection.trySend(req))?.ack ?? null;
};
