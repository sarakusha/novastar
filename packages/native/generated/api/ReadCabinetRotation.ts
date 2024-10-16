import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCabinetRotation(addr: number): Promise<number>;
    tryReadCabinetRotation(addr: number): Promise<Packet | null>;
  }
}
export default function createReadCabinetRotation(addr: number): Request {
  const req = new Request(AddressMapping.CabinetRotationOccupancy, 'ReadCabinetRotation');
  req.destination = addr;
  req.address = AddressMapping.CabinetRotationAddr;
  return req;
}
Session.prototype.ReadCabinetRotation = async function ReadCabinetRotation(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadCabinetRotation(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCabinetRotation = async function tryReadCabinetRotation(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadCabinetRotation(addr);
  return this.connection.trySend(req);
};
