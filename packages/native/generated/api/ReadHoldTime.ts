import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHoldTime(addr: number): Promise<number>;
    tryReadHoldTime(addr: number): Promise<Packet | null>;
  }
}
export default function createReadHoldTime(addr: number): Request {
  const req = new Request(AddressMapping.HoldTimeOccupancy, 'ReadHoldTime');
  req.destination = addr;
  req.address = AddressMapping.HoldTimeAddr;
  return req;
}
Session.prototype.ReadHoldTime = async function ReadHoldTime(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadHoldTime(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadHoldTime = async function tryReadHoldTime(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadHoldTime(addr);
  return this.connection.trySend(req);
};
