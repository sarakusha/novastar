import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBlueBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      blueBrightness: number
    ): Promise<void>;
    trySetBlueBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      blueBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBlueBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  blueBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(blueBrightness, AddressMapping.BlueBrightnessOccupancy);
  const req = new Request($data, bBroadcast, 'SetBlueBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BlueBrightnessAddr;
  return req;
}
Session.prototype.SetBlueBrightness = async function SetBlueBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  blueBrightness: number
): Promise<void> {
  const req = createSetBlueBrightness(addr, portAddr, scanBoardAddr, bBroadcast, blueBrightness);
  await this.connection.send(req);
};
Session.prototype.trySetBlueBrightness = async function trySetBlueBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  blueBrightness: number
): Promise<ErrorType | null> {
  const req = createSetBlueBrightness(addr, portAddr, scanBoardAddr, false, blueBrightness);
  return (await this.connection.trySend(req))?.ack ?? null;
};
