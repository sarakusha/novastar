import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadFan(addr: number): Promise<number>;
    tryReadFan(addr: number): Promise<Packet | null>;
  }
}
export default function createReadFan(addr: number): Request {
  const req = new Request(AddressMapping.FanOccupancy, 'ReadFan');
  req.destination = addr;
  req.address = AddressMapping.FanAddr;
  return req;
}
Session.prototype.ReadFan = async function ReadFan(this: Session, addr: number): Promise<number> {
  const req = createReadFan(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadFan = async function tryReadFan(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadFan(addr);
  return this.connection.trySend(req);
};
