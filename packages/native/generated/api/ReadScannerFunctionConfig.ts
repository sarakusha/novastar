import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerFunctionConfig(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScannerFunctionConfig(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerFunctionConfig(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ScanBoardFunctionConfigOccupancy,
    'ReadScannerFunctionConfig'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanBoardFunctionConfigAddr;
  return req;
}
Session.prototype.ReadScannerFunctionConfig = async function ReadScannerFunctionConfig(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScannerFunctionConfig(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerFunctionConfig = async function tryReadScannerFunctionConfig(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerFunctionConfig(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
