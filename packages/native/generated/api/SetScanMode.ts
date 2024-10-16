import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ScanTypeEnum } from '../ScanType';

declare module '@novastar/codec' {
  interface API {
    SetScanMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanMode: ScanTypeEnum
    ): Promise<void>;
    trySetScanMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanMode: ScanTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanMode: ScanTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(scanMode, AddressMapping.ScanModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetScanMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanModeAddr;
  return req;
}
Session.prototype.SetScanMode = async function SetScanMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanMode: ScanTypeEnum
): Promise<void> {
  const req = createSetScanMode(addr, portAddr, scanBoardAddr, bBroadcast, scanMode);
  await this.connection.send(req);
};
Session.prototype.trySetScanMode = async function trySetScanMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanMode: ScanTypeEnum
): Promise<ErrorType | null> {
  const req = createSetScanMode(addr, portAddr, scanBoardAddr, false, scanMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
