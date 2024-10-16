import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDeviceTable(addr: number, readLen: number): Promise<Buffer>;
    tryReadDeviceTable(addr: number, readLen: number): Promise<Packet | null>;
  }
}
export default function createReadDeviceTable(addr: number, readLen: number): Request {
  const req = new Request(readLen, 'ReadDeviceTable');
  req.destination = addr;
  req.address = AddressMapping.DeviceTableAddr;
  return req;
}
Session.prototype.ReadDeviceTable = async function ReadDeviceTable(
  this: Session,
  addr: number,
  readLen: number
): Promise<Buffer> {
  const req = createReadDeviceTable(addr, readLen);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadDeviceTable = async function tryReadDeviceTable(
  this: Session,
  addr: number,
  readLen: number
): Promise<Packet | null> {
  const req = createReadDeviceTable(addr, readLen);
  return this.connection.trySend(req);
};
