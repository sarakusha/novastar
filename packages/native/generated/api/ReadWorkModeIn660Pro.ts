import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadWorkModeIn660Pro(addr: number): Promise<number>;
    tryReadWorkModeIn660Pro(addr: number): Promise<Packet | null>;
  }
}
export default function createReadWorkModeIn660Pro(addr: number): Request {
  const req = new Request(AddressMapping.WorkModeIn660ProOccupancy, 'ReadWorkModeIn660Pro');
  req.destination = addr;
  req.address = AddressMapping.WorkModeIn660ProAddr;
  return req;
}
Session.prototype.ReadWorkModeIn660Pro = async function ReadWorkModeIn660Pro(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadWorkModeIn660Pro(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadWorkModeIn660Pro = async function tryReadWorkModeIn660Pro(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadWorkModeIn660Pro(addr);
  return this.connection.trySend(req);
};
