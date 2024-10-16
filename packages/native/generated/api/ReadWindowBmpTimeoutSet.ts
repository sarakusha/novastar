import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadWindowBmpTimeoutSet(addr: number): Promise<number>;
    tryReadWindowBmpTimeoutSet(addr: number): Promise<Packet | null>;
  }
}
export default function createReadWindowBmpTimeoutSet(addr: number): Request {
  const req = new Request(
    AddressMapping.VirtualWindowBmpTimeoutSetOccupancy,
    'ReadWindowBmpTimeoutSet'
  );
  req.destination = addr;
  req.address = AddressMapping.VirtualWindowBmpTimeoutSetAddr;
  return req;
}
Session.prototype.ReadWindowBmpTimeoutSet = async function ReadWindowBmpTimeoutSet(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadWindowBmpTimeoutSet(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadWindowBmpTimeoutSet = async function tryReadWindowBmpTimeoutSet(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadWindowBmpTimeoutSet(addr);
  return this.connection.trySend(req);
};
