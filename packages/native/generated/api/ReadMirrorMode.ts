import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMirrorMode(addr: number, isPreposition: boolean): Promise<number>;
    tryReadMirrorMode(addr: number, isPreposition: boolean): Promise<Packet | null>;
  }
}
export default function createReadMirrorMode(addr: number, isPreposition: boolean): Request {
  const req = new Request(AddressMapping.MirrorModeOccupancy, 'ReadMirrorMode');
  req.destination = addr;
  if (isPreposition) {
    req.address = AddressMapping.MirrorModeFirAddr;
  } else {
    req.address = AddressMapping.MirrorModeSecAddr;
  }
  return req;
}
Session.prototype.ReadMirrorMode = async function ReadMirrorMode(
  this: Session,
  addr: number,
  isPreposition: boolean
): Promise<number> {
  const req = createReadMirrorMode(addr, isPreposition);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMirrorMode = async function tryReadMirrorMode(
  this: Session,
  addr: number,
  isPreposition: boolean
): Promise<Packet | null> {
  const req = createReadMirrorMode(addr, isPreposition);
  return this.connection.trySend(req);
};
