import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScreenEncrypt(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      screenEncrypt: number
    ): Promise<void>;
    trySetScreenEncrypt(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      screenEncrypt: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScreenEncrypt<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  screenEncrypt: number
): Request<Broadcast> {
  const $data = encodeUIntLE(screenEncrypt, AddressMapping.ScreenEncryptOccupancy);
  const req = new Request($data, bBroadcast, 'SetScreenEncrypt');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScreenEncryptAddr;
  return req;
}
Session.prototype.SetScreenEncrypt = async function SetScreenEncrypt(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  screenEncrypt: number
): Promise<void> {
  const req = createSetScreenEncrypt(addr, portAddr, scanBoardAddr, bBroadcast, screenEncrypt);
  await this.connection.send(req);
};
Session.prototype.trySetScreenEncrypt = async function trySetScreenEncrypt(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  screenEncrypt: number
): Promise<ErrorType | null> {
  const req = createSetScreenEncrypt(addr, portAddr, scanBoardAddr, false, screenEncrypt);
  return (await this.connection.trySend(req))?.ack ?? null;
};
