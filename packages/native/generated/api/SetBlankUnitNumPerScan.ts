import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBlankUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      blankUnitNumPerScan: number
    ): Promise<void>;
    trySetBlankUnitNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      blankUnitNumPerScan: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBlankUnitNumPerScan<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  blankUnitNumPerScan: number
): Request<Broadcast> {
  const $data = encodeUIntLE(blankUnitNumPerScan, AddressMapping.BlankUnitNumPerScanOccupancy);
  const req = new Request($data, bBroadcast, 'SetBlankUnitNumPerScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BlankUnitNumPerScanAddr;
  return req;
}
Session.prototype.SetBlankUnitNumPerScan = async function SetBlankUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  blankUnitNumPerScan: number
): Promise<void> {
  const req = createSetBlankUnitNumPerScan(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    blankUnitNumPerScan
  );
  await this.connection.send(req);
};
Session.prototype.trySetBlankUnitNumPerScan = async function trySetBlankUnitNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  blankUnitNumPerScan: number
): Promise<ErrorType | null> {
  const req = createSetBlankUnitNumPerScan(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    blankUnitNumPerScan
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
