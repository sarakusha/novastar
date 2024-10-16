import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { VirtualModeTypeEnum } from '../VirtualModeType';

declare module '@novastar/codec' {
  interface API {
    SetVirtualEnable(
      addr: number,
      bBroadcast: boolean,
      virtualEnable: VirtualModeTypeEnum
    ): Promise<void>;
    trySetVirtualEnable(
      addr: number,
      virtualEnable: VirtualModeTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtualEnable: VirtualModeTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(virtualEnable, AddressMapping.VirtualEnableOccupancy);
  const req = new Request($data, bBroadcast, 'SetVirtualEnable');
  req.destination = addr;
  req.address = AddressMapping.VirtualEnableAddr;
  return req;
}
Session.prototype.SetVirtualEnable = async function SetVirtualEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtualEnable: VirtualModeTypeEnum
): Promise<void> {
  const req = createSetVirtualEnable(addr, bBroadcast, virtualEnable);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualEnable = async function trySetVirtualEnable(
  this: Session,
  addr: number,
  virtualEnable: VirtualModeTypeEnum
): Promise<ErrorType | null> {
  const req = createSetVirtualEnable(addr, false, virtualEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
