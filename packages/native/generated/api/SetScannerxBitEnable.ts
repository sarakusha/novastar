import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerxBitEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      da: number
    ): Promise<void>;
    trySetScannerxBitEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      da: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerxBitEnable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  da: number
): Request<Broadcast> {
  const req = new Request([da], bBroadcast, 'SetScannerxBitEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner22bitEnableAddr;
  return req;
}
Session.prototype.SetScannerxBitEnable = async function SetScannerxBitEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  da: number
): Promise<void> {
  const req = createSetScannerxBitEnable(addr, portAddr, scanBoardAddr, bBroadcast, da);
  await this.connection.send(req);
};
Session.prototype.trySetScannerxBitEnable = async function trySetScannerxBitEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  da: number
): Promise<ErrorType | null> {
  const req = createSetScannerxBitEnable(addr, portAddr, scanBoardAddr, false, da);
  return (await this.connection.trySend(req))?.ack ?? null;
};
