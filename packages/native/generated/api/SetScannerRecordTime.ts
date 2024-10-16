import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerRecordTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean
    ): Promise<void>;
    trySetScannerRecordTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerRecordTime<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const $data = encodeUIntLE(0, AddressMapping.ScannerRecordTimeOccupancy);
  const req = new Request($data, bBroadcast, 'SetScannerRecordTime');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerRecordTimeAddr;
  return req;
}
Session.prototype.SetScannerRecordTime = async function SetScannerRecordTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createSetScannerRecordTime(addr, portAddr, scanBoardAddr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.trySetScannerRecordTime = async function trySetScannerRecordTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<ErrorType | null> {
  const req = createSetScannerRecordTime(addr, portAddr, scanBoardAddr, false);
  return (await this.connection.trySend(req))?.ack ?? null;
};
