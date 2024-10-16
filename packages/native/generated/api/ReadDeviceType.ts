import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDeviceType(addr: number): Promise<number>;
    tryReadDeviceType(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDeviceType(addr: number): Request {
  const req = new Request(AddressMapping.CompanyIdOccupancy, 'ReadDeviceType');
  req.destination = addr;
  req.address = AddressMapping.DeviceTypeAddr;
  return req;
}
Session.prototype.ReadDeviceType = async function ReadDeviceType(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDeviceType(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDeviceType = async function tryReadDeviceType(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDeviceType(addr);
  return this.connection.trySend(req);
};
