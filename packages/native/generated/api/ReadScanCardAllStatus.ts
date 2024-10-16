import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanCardAllStatus(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScanCardAllStatus(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanCardAllStatus(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_ScanCardAllStatusOccupancy,
    'ReadScanCardAllStatus'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_ScanCardAllStatusAddr;
  return req;
}
Session.prototype.ReadScanCardAllStatus = async function ReadScanCardAllStatus(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScanCardAllStatus(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScanCardAllStatus = async function tryReadScanCardAllStatus(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScanCardAllStatus(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
