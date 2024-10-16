import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVirtualEnable(addr: number): Promise<number>;
    tryReadVirtualEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadVirtualEnable(addr: number): Request {
  const req = new Request(AddressMapping.VirtualEnableOccupancy, 'ReadVirtualEnable');
  req.destination = addr;
  req.address = AddressMapping.VirtualEnableAddr;
  return req;
}
Session.prototype.ReadVirtualEnable = async function ReadVirtualEnable(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadVirtualEnable(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVirtualEnable = async function tryReadVirtualEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadVirtualEnable(addr);
  return this.connection.trySend(req);
};
