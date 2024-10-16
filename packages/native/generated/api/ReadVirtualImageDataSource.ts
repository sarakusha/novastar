import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVirtualImageDataSource(addr: number): Promise<number>;
    tryReadVirtualImageDataSource(addr: number): Promise<Packet | null>;
  }
}
export default function createReadVirtualImageDataSource(addr: number): Request {
  const req = new Request(
    AddressMapping.VirtualImageDataSourceOccupancy,
    'ReadVirtualImageDataSource'
  );
  req.destination = addr;
  req.address = AddressMapping.VirtualImageDataSourceAddr;
  return req;
}
Session.prototype.ReadVirtualImageDataSource = async function ReadVirtualImageDataSource(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadVirtualImageDataSource(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVirtualImageDataSource = async function tryReadVirtualImageDataSource(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadVirtualImageDataSource(addr);
  return this.connection.trySend(req);
};
