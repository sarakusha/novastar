import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScaleEn(addr: number): Promise<number>;
    tryReadScaleEn(addr: number): Promise<Packet | null>;
  }
}
export default function createReadScaleEn(addr: number): Request {
  const req = new Request(AddressMapping.DVIScaleEnOccupancy, 'ReadScaleEn');
  req.destination = addr;
  req.address = AddressMapping.DVIScaleEnAddr;
  return req;
}
Session.prototype.ReadScaleEn = async function ReadScaleEn(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadScaleEn(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScaleEn = async function tryReadScaleEn(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadScaleEn(addr);
  return this.connection.trySend(req);
};
