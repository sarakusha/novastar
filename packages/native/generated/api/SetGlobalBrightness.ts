import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGlobalBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      globalBrightness: number
    ): Promise<void>;
    trySetGlobalBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      globalBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGlobalBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  globalBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(globalBrightness, AddressMapping.GlobalBrightnessOccupancy);
  const req = new Request($data, bBroadcast, 'SetGlobalBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GlobalBrightnessAddr;
  return req;
}
Session.prototype.SetGlobalBrightness = async function SetGlobalBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  globalBrightness: number
): Promise<void> {
  const req = createSetGlobalBrightness(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    globalBrightness
  );
  await this.connection.send(req);
};
Session.prototype.trySetGlobalBrightness = async function trySetGlobalBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  globalBrightness: number
): Promise<ErrorType | null> {
  const req = createSetGlobalBrightness(addr, portAddr, scanBoardAddr, false, globalBrightness);
  return (await this.connection.trySend(req))?.ack ?? null;
};
