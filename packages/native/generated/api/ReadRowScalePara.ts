import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRowScalePara(addr: number): Promise<number>;
    tryReadRowScalePara(addr: number): Promise<Packet | null>;
  }
}
export default function createReadRowScalePara(addr: number): Request {
  const req = new Request(AddressMapping.RowScaleParAOccupancy, 'ReadRowScalePara');
  req.destination = addr;
  req.address = AddressMapping.RowScaleParaAddr;
  return req;
}
Session.prototype.ReadRowScalePara = async function ReadRowScalePara(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadRowScalePara(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadRowScalePara = async function tryReadRowScalePara(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadRowScalePara(addr);
  return this.connection.trySend(req);
};
