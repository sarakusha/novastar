import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EncryptKeyLength(addr: number, bBroadcast: boolean, keyLength: number): Promise<void>;
    trySetSender_EncryptKeyLength(addr: number, keyLength: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EncryptKeyLength<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  keyLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(keyLength, AddressMapping.Sender_EncryptKeyLengthOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_EncryptKeyLength');
  req.destination = addr;
  req.address = AddressMapping.Sender_EncryptKeyLengthAddr;
  return req;
}
Session.prototype.SetSender_EncryptKeyLength = async function SetSender_EncryptKeyLength(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  keyLength: number
): Promise<void> {
  const req = createSetSender_EncryptKeyLength(addr, bBroadcast, keyLength);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EncryptKeyLength = async function trySetSender_EncryptKeyLength(
  this: Session,
  addr: number,
  keyLength: number
): Promise<ErrorType | null> {
  const req = createSetSender_EncryptKeyLength(addr, false, keyLength);
  return (await this.connection.trySend(req))?.ack ?? null;
};
