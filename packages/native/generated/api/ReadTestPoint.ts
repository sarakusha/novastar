import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTestPoint(addr: number): Promise<number>;
    tryReadTestPoint(addr: number): Promise<Packet | null>;
  }
}
export default function createReadTestPoint(addr: number): Request {
  const req = new Request(AddressMapping.TestPointOccupancy, 'ReadTestPoint');
  req.destination = addr;
  req.address = AddressMapping.TestPointAddr;
  return req;
}
Session.prototype.ReadTestPoint = async function ReadTestPoint(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadTestPoint(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTestPoint = async function tryReadTestPoint(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadTestPoint(addr);
  return this.connection.trySend(req);
};
