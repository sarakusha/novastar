import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanConrectionMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isOpen: boolean
    ): Promise<void>;
    trySetScanConrectionMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isOpen: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanConrectionMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isOpen: boolean
): Request<Broadcast> {
  const req = new Request(isOpen ? [85] : [170], bBroadcast, 'SetScanConrectionMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerCorrectionModeAddr;
  return req;
}
Session.prototype.SetScanConrectionMode = async function SetScanConrectionMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isOpen: boolean
): Promise<void> {
  const req = createSetScanConrectionMode(addr, portAddr, scanBoardAddr, bBroadcast, isOpen);
  await this.connection.send(req);
};
Session.prototype.trySetScanConrectionMode = async function trySetScanConrectionMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isOpen: boolean
): Promise<ErrorType | null> {
  const req = createSetScanConrectionMode(addr, portAddr, scanBoardAddr, false, isOpen);
  return (await this.connection.trySend(req))?.ack ?? null;
};
