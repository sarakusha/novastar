import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EncryptPassword(
      addr: number,
      bBroadcast: boolean,
      Passward: number[] | Buffer
    ): Promise<void>;
    trySetSender_EncryptPassword(
      addr: number,
      Passward: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EncryptPassword<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  Passward: number[] | Buffer
): Request<Broadcast> {
  if (Passward.length !== AddressMapping.Sender_EncryptPasswordOccupancy)
    throw new TypeError(`Invalid buffer size: ${Passward.length}`);
  const req = new Request(Passward, bBroadcast, 'SetSender_EncryptPassword');
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptPasswordAddr;
  return req;
}
Session.prototype.SetSender_EncryptPassword = async function SetSender_EncryptPassword(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  Passward: number[] | Buffer
): Promise<void> {
  const req = createSetSender_EncryptPassword(addr, bBroadcast, Passward);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EncryptPassword = async function trySetSender_EncryptPassword(
  this: Session,
  addr: number,
  Passward: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_EncryptPassword(addr, false, Passward);
  return (await this.connection.trySend(req))?.ack ?? null;
};
