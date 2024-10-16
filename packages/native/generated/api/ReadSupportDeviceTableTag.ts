import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSupportDeviceTableTag(addr: number): Promise<number>;
    tryReadSupportDeviceTableTag(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSupportDeviceTableTag(addr: number): Request {
  const req = new Request(AddressMapping.SupportDeviceTableOccupancy, 'ReadSupportDeviceTableTag');
  req.destination = addr;
  req.address = AddressMapping.SupportDeviceTableAddr;
  return req;
}
Session.prototype.ReadSupportDeviceTableTag = async function ReadSupportDeviceTableTag(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSupportDeviceTableTag(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSupportDeviceTableTag = async function tryReadSupportDeviceTableTag(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSupportDeviceTableTag(addr);
  return this.connection.trySend(req);
};
