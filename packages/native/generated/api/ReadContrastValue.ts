import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadContrastValue(addr: number): Promise<number>;
    tryReadContrastValue(addr: number): Promise<Packet | null>;
  }
}
export default function createReadContrastValue(addr: number): Request {
  const req = new Request(AddressMapping.SenderContrastResultOccupancy, 'ReadContrastValue');
  req.destination = addr;
  req.address = AddressMapping.SenderContrastResultAddr;
  return req;
}
Session.prototype.ReadContrastValue = async function ReadContrastValue(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadContrastValue(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadContrastValue = async function tryReadContrastValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadContrastValue(addr);
  return this.connection.trySend(req);
};
