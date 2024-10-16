import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SaveScannerFontLibToFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean
    ): Promise<void>;
    trySaveScannerFontLibToFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSaveScannerFontLibToFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const req = new Request([5], bBroadcast, 'SaveScannerFontLibToFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SaveScannerFontLibAddr;
  return req;
}
Session.prototype.SaveScannerFontLibToFlash = async function SaveScannerFontLibToFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createSaveScannerFontLibToFlash(addr, portAddr, scanBoardAddr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.trySaveScannerFontLibToFlash = async function trySaveScannerFontLibToFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<ErrorType | null> {
  const req = createSaveScannerFontLibToFlash(addr, portAddr, scanBoardAddr, false);
  return (await this.connection.trySend(req))?.ack ?? null;
};
