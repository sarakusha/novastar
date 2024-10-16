import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTemperature(addr: number): Promise<number>;
    tryReadTemperature(addr: number): Promise<Packet | null>;
  }
}
export default function createReadTemperature(addr: number): Request {
  const req = new Request(AddressMapping.TemperatureOccupancy, 'ReadTemperature');
  req.destination = addr;
  req.address = AddressMapping.TemperatureAddr;
  return req;
}
Session.prototype.ReadTemperature = async function ReadTemperature(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadTemperature(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTemperature = async function tryReadTemperature(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadTemperature(addr);
  return this.connection.trySend(req);
};
