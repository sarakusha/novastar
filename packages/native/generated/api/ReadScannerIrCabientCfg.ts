import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerIrCabientCfg(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadScannerIrCabientCfg(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerIrCabientCfg(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerIrCanbinetCfgOccupancy, 'ReadScannerIrCabientCfg');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerIrCanbinetCfgAddr;
  return req;
}
Session.prototype.ReadScannerIrCabientCfg = async function ReadScannerIrCabientCfg(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScannerIrCabientCfg(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerIrCabientCfg = async function tryReadScannerIrCabientCfg(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerIrCabientCfg(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
