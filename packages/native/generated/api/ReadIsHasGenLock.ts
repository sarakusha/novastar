import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadIsHasGenLock(addr: number): Promise<number>;
    tryReadIsHasGenLock(addr: number): Promise<Packet | null>;
  }
}
export default function createReadIsHasGenLock(addr: number): Request {
  const req = new Request(AddressMapping.IsHasGenLockOccupancy, 'ReadIsHasGenLock');
  req.destination = addr;
  req.address = AddressMapping.IsHasGenLockAddr;
  return req;
}
Session.prototype.ReadIsHasGenLock = async function ReadIsHasGenLock(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadIsHasGenLock(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadIsHasGenLock = async function tryReadIsHasGenLock(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadIsHasGenLock(addr);
  return this.connection.trySend(req);
};
