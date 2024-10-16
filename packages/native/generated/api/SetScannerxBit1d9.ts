import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerxBit1d9(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      da: number[] | Buffer
    ): Promise<void>;
    trySetScannerxBit1d9(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      da: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerxBit1d9<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  da: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(da, bBroadcast, 'SetScannerxBit1d9');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerxbitOptiAddr;
  return req;
}
Session.prototype.SetScannerxBit1d9 = async function SetScannerxBit1d9(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  da: number[] | Buffer
): Promise<void> {
  const req = createSetScannerxBit1d9(addr, portAddr, scanBoardAddr, bBroadcast, da);
  await this.connection.send(req);
};
Session.prototype.trySetScannerxBit1d9 = async function trySetScannerxBit1d9(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  da: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScannerxBit1d9(addr, portAddr, scanBoardAddr, false, da);
  return (await this.connection.trySend(req))?.ack ?? null;
};
