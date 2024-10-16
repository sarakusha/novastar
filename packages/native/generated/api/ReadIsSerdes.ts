import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadIsSerdes(addr: number): Promise<number>;
    tryReadIsSerdes(addr: number): Promise<Packet | null>;
  }
}
export default function createReadIsSerdes(addr: number): Request {
  const req = new Request(AddressMapping.SerdesEnableOccupancy, 'ReadIsSerdes');
  req.destination = addr;
  req.address = AddressMapping.SerdesEnableAddr;
  return req;
}
Session.prototype.ReadIsSerdes = async function ReadIsSerdes(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadIsSerdes(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadIsSerdes = async function tryReadIsSerdes(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadIsSerdes(addr);
  return this.connection.trySend(req);
};
