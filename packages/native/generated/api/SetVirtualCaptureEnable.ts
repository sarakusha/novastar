import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVirtualCaptureEnable(
      addr: number,
      bBroadcast: boolean,
      virtualCaptureEnable: boolean
    ): Promise<void>;
    trySetVirtualCaptureEnable(
      addr: number,
      virtualCaptureEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualCaptureEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtualCaptureEnable: boolean
): Request<Broadcast> {
  const $data = encodeUIntLE(
    virtualCaptureEnable ? 5 : 0,
    AddressMapping.VirtualCaptureEnableOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetVirtualCaptureEnable');
  req.destination = addr;
  req.address = AddressMapping.VirtualCaptureEnableAddr;
  return req;
}
Session.prototype.SetVirtualCaptureEnable = async function SetVirtualCaptureEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtualCaptureEnable: boolean
): Promise<void> {
  const req = createSetVirtualCaptureEnable(addr, bBroadcast, virtualCaptureEnable);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualCaptureEnable = async function trySetVirtualCaptureEnable(
  this: Session,
  addr: number,
  virtualCaptureEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetVirtualCaptureEnable(addr, false, virtualCaptureEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
