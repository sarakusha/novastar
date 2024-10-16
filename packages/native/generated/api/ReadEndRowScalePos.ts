import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadEndRowScalePos(addr: number): Promise<number>;
    tryReadEndRowScalePos(addr: number): Promise<Packet | null>;
  }
}
export default function createReadEndRowScalePos(addr: number): Request {
  const req = new Request(AddressMapping.EndRowScalePosOccupancy, 'ReadEndRowScalePos');
  req.destination = addr;
  req.address = AddressMapping.EndRowScalePosAddr;
  return req;
}
Session.prototype.ReadEndRowScalePos = async function ReadEndRowScalePos(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadEndRowScalePos(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadEndRowScalePos = async function tryReadEndRowScalePos(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadEndRowScalePos(addr);
  return this.connection.trySend(req);
};
