import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadIoControl(addr: number): Promise<number>;
    tryReadIoControl(addr: number): Promise<Packet | null>;
  }
}
export default function createReadIoControl(addr: number): Request {
  const req = new Request(AddressMapping.IoControlOccupancy, 'ReadIoControl');
  req.destination = addr;
  req.address = AddressMapping.IoControlAddr;
  return req;
}
Session.prototype.ReadIoControl = async function ReadIoControl(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadIoControl(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadIoControl = async function tryReadIoControl(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadIoControl(addr);
  return this.connection.trySend(req);
};
