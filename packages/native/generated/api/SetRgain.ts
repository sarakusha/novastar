import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      rgain: number
    ): Promise<void>;
    trySetRgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      rgain: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRgain<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  rgain: number
): Request<Broadcast> {
  const $data = encodeUIntLE(rgain, AddressMapping.RgainOccupancy);
  const req = new Request($data, bBroadcast, 'SetRgain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RgainAddr;
  return req;
}
Session.prototype.SetRgain = async function SetRgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  rgain: number
): Promise<void> {
  const req = createSetRgain(addr, portAddr, scanBoardAddr, bBroadcast, rgain);
  await this.connection.send(req);
};
Session.prototype.trySetRgain = async function trySetRgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  rgain: number
): Promise<ErrorType | null> {
  const req = createSetRgain(addr, portAddr, scanBoardAddr, false, rgain);
  return (await this.connection.trySend(req))?.ack ?? null;
};
