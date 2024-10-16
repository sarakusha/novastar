import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Sender_UnLock(addr: number, bBroadcast: boolean, passWord: number): Promise<void>;
    trySender_UnLock(addr: number, passWord: number): Promise<ErrorType | null>;
  }
}
export default function createSender_UnLock<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  passWord: number
): Request<Broadcast> {
  const $data = encodeUIntLE(passWord, AddressMapping.Sender_UnLockOccupancy);
  const req = new Request($data, bBroadcast, 'Sender_UnLock');
  req.destination = addr;
  req.address = AddressMapping.Sender_UnLockAddr;
  return req;
}
Session.prototype.Sender_UnLock = async function Sender_UnLock(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  passWord: number
): Promise<void> {
  const req = createSender_UnLock(addr, bBroadcast, passWord);
  await this.connection.send(req);
};
Session.prototype.trySender_UnLock = async function trySender_UnLock(
  this: Session,
  addr: number,
  passWord: number
): Promise<ErrorType | null> {
  const req = createSender_UnLock(addr, false, passWord);
  return (await this.connection.trySend(req))?.ack ?? null;
};
