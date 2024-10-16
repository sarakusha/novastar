import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerFunctionInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadScannerFunctionInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerFunctionInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScanCardFunctionOccupancy, 'ReadScannerFunctionInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanCardFunctionAddr;
  return req;
}
Session.prototype.ReadScannerFunctionInfo = async function ReadScannerFunctionInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScannerFunctionInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerFunctionInfo = async function tryReadScannerFunctionInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerFunctionInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
