import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerCabinetCorrectLocationSize(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScannerCabinetCorrectLocationSize(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerCabinetCorrectLocationSize(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ScannerCabinetCorrectLocationSizeOccupancy,
    'ReadScannerCabinetCorrectLocationSize'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerCabinetCorrectLocationSizeAddr;
  return req;
}
Session.prototype.ReadScannerCabinetCorrectLocationSize =
  async function ReadScannerCabinetCorrectLocationSize(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = createReadScannerCabinetCorrectLocationSize(addr, portAddr, scanBoardAddr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadScannerCabinetCorrectLocationSize =
  async function tryReadScannerCabinetCorrectLocationSize(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadScannerCabinetCorrectLocationSize(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
