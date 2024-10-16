import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerResetCycleNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadScannerResetCycleNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerResetCycleNum(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ResetCycleNumPointOccupancy, 'ReadScannerResetCycleNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerResetCycleNumAddr;
  return req;
}
Session.prototype.ReadScannerResetCycleNum = async function ReadScannerResetCycleNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScannerResetCycleNum(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScannerResetCycleNum = async function tryReadScannerResetCycleNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerResetCycleNum(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
