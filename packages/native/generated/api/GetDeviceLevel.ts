import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    GetDeviceLevel(addr: number): Promise<number>;
    tryGetDeviceLevel(addr: number): Promise<Packet | null>;
  }
}
export default function createGetDeviceLevel(addr: number): Request {
  const req = new Request(AddressMapping.SenderContrastResultOccupancy, 'GetDeviceLevel');
  req.destination = addr;
  req.address = AddressMapping.SenderLevelAddr;
  return req;
}
Session.prototype.GetDeviceLevel = async function GetDeviceLevel(
  this: Session,
  addr: number
): Promise<number> {
  const req = createGetDeviceLevel(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryGetDeviceLevel = async function tryGetDeviceLevel(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createGetDeviceLevel(addr);
  return this.connection.trySend(req);
};
