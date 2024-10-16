import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRedBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      redBrightness: number
    ): Promise<void>;
    trySetRedBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      redBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRedBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  redBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(redBrightness, AddressMapping.RedBrightnessOccupancy);
  const req = new Request($data, bBroadcast, 'SetRedBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RedBrightnessAddr;
  return req;
}
Session.prototype.SetRedBrightness = async function SetRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  redBrightness: number
): Promise<void> {
  const req = createSetRedBrightness(addr, portAddr, scanBoardAddr, bBroadcast, redBrightness);
  await this.connection.send(req);
};
Session.prototype.trySetRedBrightness = async function trySetRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  redBrightness: number
): Promise<ErrorType | null> {
  const req = createSetRedBrightness(addr, portAddr, scanBoardAddr, false, redBrightness);
  return (await this.connection.trySend(req))?.ack ?? null;
};
