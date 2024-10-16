import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGlobalBrightnessOf2053(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      globalBrightness: number
    ): Promise<void>;
    trySetGlobalBrightnessOf2053(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      globalBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGlobalBrightnessOf2053<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  globalBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(globalBrightness, AddressMapping.GlobalBrightnessOf2053Occupancy);
  const req = new Request($data, bBroadcast, 'SetGlobalBrightnessOf2053');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GlobalBrightnessOf2053Addr;
  return req;
}
Session.prototype.SetGlobalBrightnessOf2053 = async function SetGlobalBrightnessOf2053(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  globalBrightness: number
): Promise<void> {
  const req = createSetGlobalBrightnessOf2053(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    globalBrightness
  );
  await this.connection.send(req);
};
Session.prototype.trySetGlobalBrightnessOf2053 = async function trySetGlobalBrightnessOf2053(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  globalBrightness: number
): Promise<ErrorType | null> {
  const req = createSetGlobalBrightnessOf2053(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    globalBrightness
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
