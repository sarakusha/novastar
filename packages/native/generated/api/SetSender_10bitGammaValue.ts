import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_10bitGammaValue(addr: number, bBroadcast: boolean, gammaValue: number): Promise<void>;
    trySetSender_10bitGammaValue(addr: number, gammaValue: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_10bitGammaValue<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  gammaValue: number
): Request<Broadcast> {
  const req = new Request([gammaValue], bBroadcast, 'SetSender_10bitGammaValue');
  req.destination = addr;
  req.address = AddressMapping.Sender_10bitGammaValueAddr;
  return req;
}
Session.prototype.SetSender_10bitGammaValue = async function SetSender_10bitGammaValue(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  gammaValue: number
): Promise<void> {
  const req = createSetSender_10bitGammaValue(addr, bBroadcast, gammaValue);
  await this.connection.send(req);
};
Session.prototype.trySetSender_10bitGammaValue = async function trySetSender_10bitGammaValue(
  this: Session,
  addr: number,
  gammaValue: number
): Promise<ErrorType | null> {
  const req = createSetSender_10bitGammaValue(addr, false, gammaValue);
  return (await this.connection.trySend(req))?.ack ?? null;
};
