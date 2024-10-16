import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVRedBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      vRedBrightness: number
    ): Promise<void>;
    trySetVRedBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      vRedBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetVRedBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  vRedBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(vRedBrightness, AddressMapping.VRedBrightnessOccupancy);
  const req = new Request($data, bBroadcast, 'SetVRedBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.VRedBrightnessAddr;
  return req;
}
Session.prototype.SetVRedBrightness = async function SetVRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  vRedBrightness: number
): Promise<void> {
  const req = createSetVRedBrightness(addr, portAddr, scanBoardAddr, bBroadcast, vRedBrightness);
  await this.connection.send(req);
};
Session.prototype.trySetVRedBrightness = async function trySetVRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  vRedBrightness: number
): Promise<ErrorType | null> {
  const req = createSetVRedBrightness(addr, portAddr, scanBoardAddr, false, vRedBrightness);
  return (await this.connection.trySend(req))?.ack ?? null;
};
