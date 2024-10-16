import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadConfigFileID(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadConfigFileID(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadConfigFileID(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerConfigFileIDOccupancy, 'ReadConfigFileID');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerConfigFileIDAddr;
  return req;
}
Session.prototype.ReadConfigFileID = async function ReadConfigFileID(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadConfigFileID(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadConfigFileID = async function tryReadConfigFileID(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadConfigFileID(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
