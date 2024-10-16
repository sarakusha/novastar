import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBlankUnitNumPerScan(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadBlankUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadBlankUnitNumPerScan(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.BlankUnitNumPerScanOccupancy, 'ReadBlankUnitNumPerScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BlankUnitNumPerScanAddr;
  return req;
}
Session.prototype.ReadBlankUnitNumPerScan = async function ReadBlankUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadBlankUnitNumPerScan(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBlankUnitNumPerScan = async function tryReadBlankUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBlankUnitNumPerScan(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
