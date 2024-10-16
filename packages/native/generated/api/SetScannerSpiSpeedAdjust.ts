import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerSpiSpeedAdjust(
      Sender: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      speed: number[] | Buffer
    ): Promise<void>;
    trySetScannerSpiSpeedAdjust(
      Sender: number,
      portAddr: number,
      scanBoardAddr: number,
      speed: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerSpiSpeedAdjust<Broadcast extends boolean>(
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  speed: number[] | Buffer
): Request<Broadcast> {
  if (speed.length !== AddressMapping.ScannerSpiSpeedAdjustOccupancy)
    throw new TypeError(`Invalid buffer size: ${speed.length}`);
  const req = new Request(speed, bBroadcast, 'SetScannerSpiSpeedAdjust');
  req.destination = Sender;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerSpiSpeedAdjustAddr;
  return req;
}
Session.prototype.SetScannerSpiSpeedAdjust = async function SetScannerSpiSpeedAdjust(
  this: Session,
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  speed: number[] | Buffer
): Promise<void> {
  const req = createSetScannerSpiSpeedAdjust(Sender, portAddr, scanBoardAddr, bBroadcast, speed);
  await this.connection.send(req);
};
Session.prototype.trySetScannerSpiSpeedAdjust = async function trySetScannerSpiSpeedAdjust(
  this: Session,
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  speed: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScannerSpiSpeedAdjust(Sender, portAddr, scanBoardAddr, false, speed);
  return (await this.connection.trySend(req))?.ack ?? null;
};
