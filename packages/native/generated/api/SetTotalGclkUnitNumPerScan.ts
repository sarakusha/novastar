import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTotalGclkUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      totalGclk: number
    ): Promise<void>;
    trySetTotalGclkUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      totalGclk: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTotalGclkUnitNumPerScan<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  totalGclk: number
): Request<Broadcast> {
  const $data = encodeUIntLE(totalGclk, AddressMapping.TotalGclkUnitNumPerScanOccupancy);
  const req = new Request($data, bBroadcast, 'SetTotalGclkUnitNumPerScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalGclkUnitNumPerScanAddr;
  return req;
}
Session.prototype.SetTotalGclkUnitNumPerScan = async function SetTotalGclkUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  totalGclk: number
): Promise<void> {
  const req = createSetTotalGclkUnitNumPerScan(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    totalGclk
  );
  await this.connection.send(req);
};
Session.prototype.trySetTotalGclkUnitNumPerScan = async function trySetTotalGclkUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  totalGclk: number
): Promise<ErrorType | null> {
  const req = createSetTotalGclkUnitNumPerScan(addr, portAddr, scanBoardAddr, false, totalGclk);
  return (await this.connection.trySend(req))?.ack ?? null;
};
