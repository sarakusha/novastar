import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSaturationValue(addr: number): Promise<number>;
    tryReadSaturationValue(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSaturationValue(addr: number): Request {
  const req = new Request(AddressMapping.SenderSaturationResultOccupancy, 'ReadSaturationValue');
  req.destination = addr;
  req.address = AddressMapping.SenderSaturationResultAddr;
  return req;
}
Session.prototype.ReadSaturationValue = async function ReadSaturationValue(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSaturationValue(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSaturationValue = async function tryReadSaturationValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSaturationValue(addr);
  return this.connection.trySend(req);
};
