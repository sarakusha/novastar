import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVirtualFrameRate(addr: number, bBroadcast: boolean, virtualFrameRate: number): Promise<void>;
    trySetVirtualFrameRate(addr: number, virtualFrameRate: number): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualFrameRate<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtualFrameRate: number
): Request<Broadcast> {
  const $data = encodeUIntLE(virtualFrameRate, AddressMapping.VirtualFrameRateOccupancy);
  const req = new Request($data, bBroadcast, 'SetVirtualFrameRate');
  req.destination = addr;
  req.address = AddressMapping.VirtualFrameRateAddr;
  return req;
}
Session.prototype.SetVirtualFrameRate = async function SetVirtualFrameRate(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtualFrameRate: number
): Promise<void> {
  const req = createSetVirtualFrameRate(addr, bBroadcast, virtualFrameRate);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualFrameRate = async function trySetVirtualFrameRate(
  this: Session,
  addr: number,
  virtualFrameRate: number
): Promise<ErrorType | null> {
  const req = createSetVirtualFrameRate(addr, false, virtualFrameRate);
  return (await this.connection.trySend(req))?.ack ?? null;
};
