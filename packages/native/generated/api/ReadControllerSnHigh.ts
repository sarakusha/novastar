import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadControllerSnHigh(addr: number): Promise<Buffer>;
    tryReadControllerSnHigh(addr: number): Promise<Packet | null>;
  }
}
export default function createReadControllerSnHigh(addr: number): Request {
  const req = new Request(AddressMapping.ControllerSnHighOccupancy, 'ReadControllerSnHigh');
  req.destination = addr;
  req.address = AddressMapping.ControllerSnHighAddr;
  return req;
}
Session.prototype.ReadControllerSnHigh = async function ReadControllerSnHigh(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadControllerSnHigh(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadControllerSnHigh = async function tryReadControllerSnHigh(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadControllerSnHigh(addr);
  return this.connection.trySend(req);
};
