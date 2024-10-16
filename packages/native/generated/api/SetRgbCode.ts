import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRgbCode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      red: number,
      green: number,
      blue: number,
      virtualRed: number
    ): Promise<void>;
    trySetRgbCode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      red: number,
      green: number,
      blue: number,
      virtualRed: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRgbCode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  red: number,
  green: number,
  blue: number,
  virtualRed: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    red | (green << 2) | (blue << 4) | (virtualRed << 6),
    AddressMapping.RgbCodeOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetRgbCode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RgbCodeAddr;
  return req;
}
Session.prototype.SetRgbCode = async function SetRgbCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  red: number,
  green: number,
  blue: number,
  virtualRed: number
): Promise<void> {
  const req = createSetRgbCode(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    red,
    green,
    blue,
    virtualRed
  );
  await this.connection.send(req);
};
Session.prototype.trySetRgbCode = async function trySetRgbCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  red: number,
  green: number,
  blue: number,
  virtualRed: number
): Promise<ErrorType | null> {
  const req = createSetRgbCode(addr, portAddr, scanBoardAddr, false, red, green, blue, virtualRed);
  return (await this.connection.trySend(req))?.ack ?? null;
};
