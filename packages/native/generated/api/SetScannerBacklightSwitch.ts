import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerBacklightSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isOpen: boolean
    ): Promise<void>;
    trySetScannerBacklightSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isOpen: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerBacklightSwitch<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isOpen: boolean
): Request<Broadcast> {
  const req = new Request(isOpen ? [22] : [0], bBroadcast, 'SetScannerBacklightSwitch');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerBacklightSwitchAddr;
  return req;
}
Session.prototype.SetScannerBacklightSwitch = async function SetScannerBacklightSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isOpen: boolean
): Promise<void> {
  const req = createSetScannerBacklightSwitch(addr, portAddr, scanBoardAddr, bBroadcast, isOpen);
  await this.connection.send(req);
};
Session.prototype.trySetScannerBacklightSwitch = async function trySetScannerBacklightSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isOpen: boolean
): Promise<ErrorType | null> {
  const req = createSetScannerBacklightSwitch(addr, portAddr, scanBoardAddr, false, isOpen);
  return (await this.connection.trySend(req))?.ack ?? null;
};
