import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTotalGclkUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadTotalGclkUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTotalGclkUnitNumPerScan(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.TotalGclkUnitNumPerScanOccupancy,
    'ReadTotalGclkUnitNumPerScan'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalGclkUnitNumPerScanAddr;
  return req;
}
Session.prototype.ReadTotalGclkUnitNumPerScan = async function ReadTotalGclkUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTotalGclkUnitNumPerScan(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTotalGclkUnitNumPerScan = async function tryReadTotalGclkUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTotalGclkUnitNumPerScan(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
