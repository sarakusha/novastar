import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanSwitchMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      switchMode: number
    ): Promise<void>;
    trySetScanSwitchMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      switchMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanSwitchMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  switchMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(switchMode, AddressMapping.SwitchModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetScanSwitchMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SwitchModeAddr;
  return req;
}
Session.prototype.SetScanSwitchMode = async function SetScanSwitchMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  switchMode: number
): Promise<void> {
  const req = createSetScanSwitchMode(addr, portAddr, scanBoardAddr, bBroadcast, switchMode);
  await this.connection.send(req);
};
Session.prototype.trySetScanSwitchMode = async function trySetScanSwitchMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  switchMode: number
): Promise<ErrorType | null> {
  const req = createSetScanSwitchMode(addr, portAddr, scanBoardAddr, false, switchMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
