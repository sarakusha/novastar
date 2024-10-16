import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLanguageLibraryFlag(addr: number): Promise<number>;
    tryReadLanguageLibraryFlag(addr: number): Promise<Packet | null>;
  }
}
export default function createReadLanguageLibraryFlag(addr: number): Request {
  const req = new Request(AddressMapping.LanguageLibraryFlagOccupancy, 'ReadLanguageLibraryFlag');
  req.destination = addr;
  req.address = AddressMapping.LanguageLibraryFlagAddr;
  return req;
}
Session.prototype.ReadLanguageLibraryFlag = async function ReadLanguageLibraryFlag(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadLanguageLibraryFlag(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLanguageLibraryFlag = async function tryReadLanguageLibraryFlag(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadLanguageLibraryFlag(addr);
  return this.connection.trySend(req);
};
