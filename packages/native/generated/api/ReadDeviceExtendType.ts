import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDeviceExtendType(addr: number): Promise<number>;
    tryReadDeviceExtendType(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDeviceExtendType(addr: number): Request {
  const req = new Request(AddressMapping.DeviceExtendTypeOccupancy, 'ReadDeviceExtendType');
  req.destination = addr;
  req.address = AddressMapping.DeviceExtendTypeAddr;
  return req;
}
Session.prototype.ReadDeviceExtendType = async function ReadDeviceExtendType(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDeviceExtendType(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDeviceExtendType = async function tryReadDeviceExtendType(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDeviceExtendType(addr);
  return this.connection.trySend(req);
};
