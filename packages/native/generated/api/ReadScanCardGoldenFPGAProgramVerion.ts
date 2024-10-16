import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanCardGoldenFPGAProgramVerion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadScanCardGoldenFPGAProgramVerion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanCardGoldenFPGAProgramVerion(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ScanCardGoldenFPGAProgramVerionOccupancy,
    'ReadScanCardGoldenFPGAProgramVerion'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanCardGoldenFPGAProgramVerionAddr;
  return req;
}
Session.prototype.ReadScanCardGoldenFPGAProgramVerion =
  async function ReadScanCardGoldenFPGAProgramVerion(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createReadScanCardGoldenFPGAProgramVerion(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadScanCardGoldenFPGAProgramVerion =
  async function tryReadScanCardGoldenFPGAProgramVerion(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadScanCardGoldenFPGAProgramVerion(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
