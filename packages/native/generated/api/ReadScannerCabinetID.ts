import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerCabinetID(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadScannerCabinetID(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerCabinetID(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerCabinetIDOccupancy, 'ReadScannerCabinetID');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerCabinetIDAddr;
  return req;
}
Session.prototype.ReadScannerCabinetID = async function ReadScannerCabinetID(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScannerCabinetID(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerCabinetID = async function tryReadScannerCabinetID(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerCabinetID(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
