import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVRgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      vRgain: number
    ): Promise<void>;
    trySetVRgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      vRgain: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetVRgain<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  vRgain: number
): Request<Broadcast> {
  const $data = encodeUIntLE(vRgain, AddressMapping.VRgainOccupancy);
  const req = new Request($data, bBroadcast, 'SetVRgain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.VRgainAddr;
  return req;
}
Session.prototype.SetVRgain = async function SetVRgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  vRgain: number
): Promise<void> {
  const req = createSetVRgain(addr, portAddr, scanBoardAddr, bBroadcast, vRgain);
  await this.connection.send(req);
};
Session.prototype.trySetVRgain = async function trySetVRgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  vRgain: number
): Promise<ErrorType | null> {
  const req = createSetVRgain(addr, portAddr, scanBoardAddr, false, vRgain);
  return (await this.connection.trySend(req))?.ack ?? null;
};
