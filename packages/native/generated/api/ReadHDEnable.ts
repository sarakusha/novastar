import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHDEnable(addr: number): Promise<number>;
    tryReadHDEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadHDEnable(addr: number): Request {
  const req = new Request(AddressMapping.HDEnableOccupancy, 'ReadHDEnable');
  req.destination = addr;
  req.address = AddressMapping.HDEnableAddr;
  return req;
}
Session.prototype.ReadHDEnable = async function ReadHDEnable(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadHDEnable(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadHDEnable = async function tryReadHDEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadHDEnable(addr);
  return this.connection.trySend(req);
};
