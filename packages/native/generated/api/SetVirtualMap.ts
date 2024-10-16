import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVirtualMap(addr: number, bBroadcast: boolean, virtualMap: number): Promise<void>;
    trySetVirtualMap(addr: number, virtualMap: number): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualMap<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtualMap: number
): Request<Broadcast> {
  const $data = encodeUIntLE(virtualMap, AddressMapping.VirtualMapOccupancy);
  const req = new Request($data, bBroadcast, 'SetVirtualMap');
  req.destination = addr;
  req.address = AddressMapping.VirtualMapAddr;
  return req;
}
Session.prototype.SetVirtualMap = async function SetVirtualMap(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtualMap: number
): Promise<void> {
  const req = createSetVirtualMap(addr, bBroadcast, virtualMap);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualMap = async function trySetVirtualMap(
  this: Session,
  addr: number,
  virtualMap: number
): Promise<ErrorType | null> {
  const req = createSetVirtualMap(addr, false, virtualMap);
  return (await this.connection.trySend(req))?.ack ?? null;
};
