import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDVI0FieldRate(addr: number): Promise<number>;
    tryReadDVI0FieldRate(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDVI0FieldRate(addr: number): Request {
  const req = new Request(AddressMapping.DVI0FieldRateOccupancy, 'ReadDVI0FieldRate');
  req.destination = addr;
  req.address = AddressMapping.DVI0FieldRateAddr;
  return req;
}
Session.prototype.ReadDVI0FieldRate = async function ReadDVI0FieldRate(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDVI0FieldRate(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDVI0FieldRate = async function tryReadDVI0FieldRate(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDVI0FieldRate(addr);
  return this.connection.trySend(req);
};
