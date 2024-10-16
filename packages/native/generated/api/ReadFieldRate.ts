import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadFieldRate(addr: number): Promise<number>;
    tryReadFieldRate(addr: number): Promise<Packet | null>;
  }
}
export default function createReadFieldRate(addr: number): Request {
  const req = new Request(AddressMapping.SetFieldRateOccupancy, 'ReadFieldRate');
  req.destination = addr;
  req.address = AddressMapping.SetFieldRateAddr;
  return req;
}
Session.prototype.ReadFieldRate = async function ReadFieldRate(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadFieldRate(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadFieldRate = async function tryReadFieldRate(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadFieldRate(addr);
  return this.connection.trySend(req);
};
