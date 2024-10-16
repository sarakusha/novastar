import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVirtualImageDataSource(
      addr: number,
      bBroadcast: boolean,
      virtuaImageDataSource: number
    ): Promise<void>;
    trySetVirtualImageDataSource(
      addr: number,
      virtuaImageDataSource: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualImageDataSource<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtuaImageDataSource: number
): Request<Broadcast> {
  const $data = encodeUIntLE(virtuaImageDataSource, AddressMapping.VirtualImageDataSourceOccupancy);
  const req = new Request($data, bBroadcast, 'SetVirtualImageDataSource');
  req.destination = addr;
  req.address = AddressMapping.VirtualImageDataSourceAddr;
  return req;
}
Session.prototype.SetVirtualImageDataSource = async function SetVirtualImageDataSource(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtuaImageDataSource: number
): Promise<void> {
  const req = createSetVirtualImageDataSource(addr, bBroadcast, virtuaImageDataSource);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualImageDataSource = async function trySetVirtualImageDataSource(
  this: Session,
  addr: number,
  virtuaImageDataSource: number
): Promise<ErrorType | null> {
  const req = createSetVirtualImageDataSource(addr, false, virtuaImageDataSource);
  return (await this.connection.trySend(req))?.ack ?? null;
};
