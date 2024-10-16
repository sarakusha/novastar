import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSerialRGBCode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      red: number,
      green: number,
      blue: number,
      virtualRed: number
    ): Promise<void>;
    trySetSerialRGBCode(
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
export default function createSetSerialRGBCode<Broadcast extends boolean>(
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
    AddressMapping.SerialRGBCodeOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSerialRGBCode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SerialRGBCodeAddr;
  return req;
}
Session.prototype.SetSerialRGBCode = async function SetSerialRGBCode(
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
  const req = createSetSerialRGBCode(
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
Session.prototype.trySetSerialRGBCode = async function trySetSerialRGBCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  red: number,
  green: number,
  blue: number,
  virtualRed: number
): Promise<ErrorType | null> {
  const req = createSetSerialRGBCode(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    red,
    green,
    blue,
    virtualRed
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
