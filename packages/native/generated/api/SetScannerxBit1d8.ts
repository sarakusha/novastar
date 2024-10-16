import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerxBit1d8(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      da: number[] | Buffer
    ): Promise<void>;
    trySetScannerxBit1d8(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      da: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerxBit1d8<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  da: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(da, bBroadcast, 'SetScannerxBit1d8');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerxbitTwinkleOptiAddr;
  return req;
}
Session.prototype.SetScannerxBit1d8 = async function SetScannerxBit1d8(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  da: number[] | Buffer
): Promise<void> {
  const req = createSetScannerxBit1d8(addr, portAddr, scanBoardAddr, bBroadcast, da);
  await this.connection.send(req);
};
Session.prototype.trySetScannerxBit1d8 = async function trySetScannerxBit1d8(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  da: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScannerxBit1d8(addr, portAddr, scanBoardAddr, false, da);
  return (await this.connection.trySend(req))?.ack ?? null;
};
