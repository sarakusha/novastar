import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGreenBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      greenBrightness: number
    ): Promise<void>;
    trySetGreenBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      greenBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGreenBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  greenBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(greenBrightness, AddressMapping.GreenBrightnessOccupancy);
  const req = new Request($data, bBroadcast, 'SetGreenBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GreenBrightnessAddr;
  return req;
}
Session.prototype.SetGreenBrightness = async function SetGreenBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  greenBrightness: number
): Promise<void> {
  const req = createSetGreenBrightness(addr, portAddr, scanBoardAddr, bBroadcast, greenBrightness);
  await this.connection.send(req);
};
Session.prototype.trySetGreenBrightness = async function trySetGreenBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  greenBrightness: number
): Promise<ErrorType | null> {
  const req = createSetGreenBrightness(addr, portAddr, scanBoardAddr, false, greenBrightness);
  return (await this.connection.trySend(req))?.ack ?? null;
};
