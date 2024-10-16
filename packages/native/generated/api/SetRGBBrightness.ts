import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRGBBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      redBrightness: number,
      greenBrightness: number,
      blueBrightness: number,
      vRedBrightness: number
    ): Promise<void>;
    trySetRGBBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      redBrightness: number,
      greenBrightness: number,
      blueBrightness: number,
      vRedBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRGBBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  redBrightness: number,
  greenBrightness: number,
  blueBrightness: number,
  vRedBrightness: number
): Request<Broadcast> {
  const req = new Request(
    [redBrightness, greenBrightness, blueBrightness, vRedBrightness],
    bBroadcast,
    'SetRGBBrightness'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RGBBrightnessAddr;
  return req;
}
Session.prototype.SetRGBBrightness = async function SetRGBBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  redBrightness: number,
  greenBrightness: number,
  blueBrightness: number,
  vRedBrightness: number
): Promise<void> {
  const req = createSetRGBBrightness(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    redBrightness,
    greenBrightness,
    blueBrightness,
    vRedBrightness
  );
  await this.connection.send(req);
};
Session.prototype.trySetRGBBrightness = async function trySetRGBBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  redBrightness: number,
  greenBrightness: number,
  blueBrightness: number,
  vRedBrightness: number
): Promise<ErrorType | null> {
  const req = createSetRGBBrightness(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    redBrightness,
    greenBrightness,
    blueBrightness,
    vRedBrightness
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
