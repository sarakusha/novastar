import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadColScalePara(addr: number): Promise<number>;
    tryReadColScalePara(addr: number): Promise<Packet | null>;
  }
}
export default function createReadColScalePara(addr: number): Request {
  const req = new Request(AddressMapping.ColScaleParAOccupancy, 'ReadColScalePara');
  req.destination = addr;
  req.address = AddressMapping.ColScaleParaAddr;
  return req;
}
Session.prototype.ReadColScalePara = async function ReadColScalePara(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadColScalePara(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadColScalePara = async function tryReadColScalePara(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadColScalePara(addr);
  return this.connection.trySend(req);
};
