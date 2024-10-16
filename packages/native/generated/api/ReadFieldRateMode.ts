import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadFieldRateMode(addr: number): Promise<number>;
    tryReadFieldRateMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadFieldRateMode(addr: number): Request {
  const req = new Request(AddressMapping.FieldRateModeOccupancy, 'ReadFieldRateMode');
  req.destination = addr;
  req.address = AddressMapping.FieldRateModeAddr;
  return req;
}
Session.prototype.ReadFieldRateMode = async function ReadFieldRateMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadFieldRateMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadFieldRateMode = async function tryReadFieldRateMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadFieldRateMode(addr);
  return this.connection.trySend(req);
};
