import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScreenDecrypt(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      screenDecrypt: number
    ): Promise<void>;
    trySetScreenDecrypt(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      screenDecrypt: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScreenDecrypt<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  screenDecrypt: number
): Request<Broadcast> {
  const $data = encodeUIntLE(screenDecrypt, AddressMapping.ScreenDecryptOccupancy);
  const req = new Request($data, bBroadcast, 'SetScreenDecrypt');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScreenDecryptAddr;
  return req;
}
Session.prototype.SetScreenDecrypt = async function SetScreenDecrypt(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  screenDecrypt: number
): Promise<void> {
  const req = createSetScreenDecrypt(addr, portAddr, scanBoardAddr, bBroadcast, screenDecrypt);
  await this.connection.send(req);
};
Session.prototype.trySetScreenDecrypt = async function trySetScreenDecrypt(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  screenDecrypt: number
): Promise<ErrorType | null> {
  const req = createSetScreenDecrypt(addr, portAddr, scanBoardAddr, false, screenDecrypt);
  return (await this.connection.trySend(req))?.ack ?? null;
};
