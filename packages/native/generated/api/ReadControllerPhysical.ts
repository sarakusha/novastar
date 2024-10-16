import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadControllerPhysical(addr: number): Promise<number>;
    tryReadControllerPhysical(addr: number): Promise<Packet | null>;
  }
}
export default function createReadControllerPhysical(addr: number): Request {
  const req = new Request(AddressMapping.ControllerPhysicalOccupancy, 'ReadControllerPhysical');
  req.destination = addr;
  req.address = AddressMapping.ControllerPhysicalAddr;
  return req;
}
Session.prototype.ReadControllerPhysical = async function ReadControllerPhysical(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadControllerPhysical(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadControllerPhysical = async function tryReadControllerPhysical(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadControllerPhysical(addr);
  return this.connection.trySend(req);
};
