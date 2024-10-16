import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Scaner_UnLock(addr: number, bBroadcast: boolean, passWord: number): Promise<void>;
    tryScaner_UnLock(addr: number, passWord: number): Promise<ErrorType | null>;
  }
}
export default function createScaner_UnLock<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  passWord: number
): Request<Broadcast> {
  const $data = encodeUIntLE(passWord, AddressMapping.Scaner_UnLockOccupancy);
  const req = new Request($data, bBroadcast, 'Scaner_UnLock');
  req.destination = addr;
  req.address = AddressMapping.Scaner_UnLockAddr;
  return req;
}
Session.prototype.Scaner_UnLock = async function Scaner_UnLock(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  passWord: number
): Promise<void> {
  const req = createScaner_UnLock(addr, bBroadcast, passWord);
  await this.connection.send(req);
};
Session.prototype.tryScaner_UnLock = async function tryScaner_UnLock(
  this: Session,
  addr: number,
  passWord: number
): Promise<ErrorType | null> {
  const req = createScaner_UnLock(addr, false, passWord);
  return (await this.connection.trySend(req))?.ack ?? null;
};
