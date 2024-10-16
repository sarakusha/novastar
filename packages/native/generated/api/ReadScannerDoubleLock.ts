import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerDoubleLock(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScannerDoubleLock(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerDoubleLock(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DoubleLockPointOccupancy, 'ReadScannerDoubleLock');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerDoubleLockAddr;
  return req;
}
Session.prototype.ReadScannerDoubleLock = async function ReadScannerDoubleLock(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScannerDoubleLock(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScannerDoubleLock = async function tryReadScannerDoubleLock(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerDoubleLock(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
