import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerColorInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScannerColorInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerColorInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerColorInfoOccupancy, 'ReadScannerColorInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerColorInfoAddr;
  return req;
}
Session.prototype.ReadScannerColorInfo = async function ReadScannerColorInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScannerColorInfo(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScannerColorInfo = async function tryReadScannerColorInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerColorInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
