import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVirtualFrameRate(addr: number): Promise<number>;
    tryReadVirtualFrameRate(addr: number): Promise<Packet | null>;
  }
}
export default function createReadVirtualFrameRate(addr: number): Request {
  const req = new Request(AddressMapping.VirtualFrameRateOccupancy, 'ReadVirtualFrameRate');
  req.destination = addr;
  req.address = AddressMapping.VirtualFrameRateAddr;
  return req;
}
Session.prototype.ReadVirtualFrameRate = async function ReadVirtualFrameRate(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadVirtualFrameRate(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVirtualFrameRate = async function tryReadVirtualFrameRate(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadVirtualFrameRate(addr);
  return this.connection.trySend(req);
};
