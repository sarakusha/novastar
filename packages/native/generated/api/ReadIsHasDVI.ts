import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadIsHasDVI(addr: number): Promise<number>;
    tryReadIsHasDVI(addr: number): Promise<Packet | null>;
  }
}
export default function createReadIsHasDVI(addr: number): Request {
  const req = new Request(AddressMapping.IsHasDVISignalOccupancy, 'ReadIsHasDVI');
  req.destination = addr;
  req.address = AddressMapping.IsHasDVISignalAddr;
  return req;
}
Session.prototype.ReadIsHasDVI = async function ReadIsHasDVI(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadIsHasDVI(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadIsHasDVI = async function tryReadIsHasDVI(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadIsHasDVI(addr);
  return this.connection.trySend(req);
};
