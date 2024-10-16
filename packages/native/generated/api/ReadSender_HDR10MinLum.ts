import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HDR10MinLum(addr: number): Promise<number>;
    tryReadSender_HDR10MinLum(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HDR10MinLum(addr: number): Request {
  const req = new Request(AddressMapping.HDR10MinLumOccupancy, 'ReadSender_HDR10MinLum');
  req.destination = addr;
  req.address = AddressMapping.HDR10MinLum;
  return req;
}
Session.prototype.ReadSender_HDR10MinLum = async function ReadSender_HDR10MinLum(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_HDR10MinLum(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_HDR10MinLum = async function tryReadSender_HDR10MinLum(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_HDR10MinLum(addr);
  return this.connection.trySend(req);
};
