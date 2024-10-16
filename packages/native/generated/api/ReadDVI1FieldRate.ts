import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDVI1FieldRate(addr: number): Promise<number>;
    tryReadDVI1FieldRate(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDVI1FieldRate(addr: number): Request {
  const req = new Request(AddressMapping.DVI1FieldRateOccupancy, 'ReadDVI1FieldRate');
  req.destination = addr;
  req.address = AddressMapping.DVI1FieldRateAddr;
  return req;
}
Session.prototype.ReadDVI1FieldRate = async function ReadDVI1FieldRate(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDVI1FieldRate(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDVI1FieldRate = async function tryReadDVI1FieldRate(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDVI1FieldRate(addr);
  return this.connection.trySend(req);
};
