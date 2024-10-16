import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVirtualSendEnable(
      addr: number,
      bBroadcast: boolean,
      virtualSendEnable: boolean
    ): Promise<void>;
    trySetVirtualSendEnable(addr: number, virtualSendEnable: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualSendEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtualSendEnable: boolean
): Request<Broadcast> {
  const $data = encodeUIntLE(virtualSendEnable ? 5 : 0, AddressMapping.VirtualSendEnableOccupancy);
  const req = new Request($data, bBroadcast, 'SetVirtualSendEnable');
  req.destination = addr;
  req.address = AddressMapping.VirtualSendEnableAddr;
  return req;
}
Session.prototype.SetVirtualSendEnable = async function SetVirtualSendEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtualSendEnable: boolean
): Promise<void> {
  const req = createSetVirtualSendEnable(addr, bBroadcast, virtualSendEnable);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualSendEnable = async function trySetVirtualSendEnable(
  this: Session,
  addr: number,
  virtualSendEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetVirtualSendEnable(addr, false, virtualSendEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
