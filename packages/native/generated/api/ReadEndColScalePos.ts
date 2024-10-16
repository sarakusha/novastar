import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadEndColScalePos(addr: number): Promise<number>;
    tryReadEndColScalePos(addr: number): Promise<Packet | null>;
  }
}
export default function createReadEndColScalePos(addr: number): Request {
  const req = new Request(AddressMapping.EndColScalePosOccupancy, 'ReadEndColScalePos');
  req.destination = addr;
  req.address = AddressMapping.EndColScalePosAddr;
  return req;
}
Session.prototype.ReadEndColScalePos = async function ReadEndColScalePos(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadEndColScalePos(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadEndColScalePos = async function tryReadEndColScalePos(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadEndColScalePos(addr);
  return this.connection.trySend(req);
};
