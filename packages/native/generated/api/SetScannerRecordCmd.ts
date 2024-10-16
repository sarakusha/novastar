import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerRecordCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      bStartRecord: boolean
    ): Promise<void>;
    trySetScannerRecordCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bStartRecord: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerRecordCmd<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  bStartRecord: boolean
): Request<Broadcast> {
  const req = new Request(bStartRecord ? [1] : [0], bBroadcast, 'SetScannerRecordCmd');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceRecordCmd;
  return req;
}
Session.prototype.SetScannerRecordCmd = async function SetScannerRecordCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  bStartRecord: boolean
): Promise<void> {
  const req = createSetScannerRecordCmd(addr, portAddr, scanBoardAddr, bBroadcast, bStartRecord);
  await this.connection.send(req);
};
Session.prototype.trySetScannerRecordCmd = async function trySetScannerRecordCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bStartRecord: boolean
): Promise<ErrorType | null> {
  const req = createSetScannerRecordCmd(addr, portAddr, scanBoardAddr, false, bStartRecord);
  return (await this.connection.trySend(req))?.ack ?? null;
};
