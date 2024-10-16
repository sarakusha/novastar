import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHumidity(addr: number): Promise<number>;
    tryReadHumidity(addr: number): Promise<Packet | null>;
  }
}
export default function createReadHumidity(addr: number): Request {
  const req = new Request(AddressMapping.HumidityOccupancy, 'ReadHumidity');
  req.destination = addr;
  req.address = AddressMapping.HumidityAddr;
  return req;
}
Session.prototype.ReadHumidity = async function ReadHumidity(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadHumidity(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadHumidity = async function tryReadHumidity(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadHumidity(addr);
  return this.connection.trySend(req);
};
