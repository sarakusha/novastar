import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EncryptKey(addr: number, bBroadcast: boolean, key: number[] | Buffer): Promise<void>;
    trySetSender_EncryptKey(addr: number, key: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EncryptKey<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  key: number[] | Buffer
): Request<Broadcast> {
  if (key.length !== AddressMapping.Sender_EncryptKeyOccupancy)
    throw new TypeError(`Invalid buffer size: ${key.length}`);
  const req = new Request(key, bBroadcast, 'SetSender_EncryptKey');
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptKeyAddr;
  return req;
}
Session.prototype.SetSender_EncryptKey = async function SetSender_EncryptKey(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  key: number[] | Buffer
): Promise<void> {
  const req = createSetSender_EncryptKey(addr, bBroadcast, key);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EncryptKey = async function trySetSender_EncryptKey(
  this: Session,
  addr: number,
  key: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_EncryptKey(addr, false, key);
  return (await this.connection.trySend(req))?.ack ?? null;
};
