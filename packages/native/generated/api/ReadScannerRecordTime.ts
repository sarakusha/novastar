import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerRecordTime(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScannerRecordTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerRecordTime(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerRecordTimeOccupancy, 'ReadScannerRecordTime');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerRecordTimeAddr;
  return req;
}
Session.prototype.ReadScannerRecordTime = async function ReadScannerRecordTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScannerRecordTime(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScannerRecordTime = async function tryReadScannerRecordTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerRecordTime(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
