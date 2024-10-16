import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerDigitalTubeSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isOpen: boolean
    ): Promise<void>;
    trySetScannerDigitalTubeSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isOpen: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerDigitalTubeSwitch<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isOpen: boolean
): Request<Broadcast> {
  const req = new Request(isOpen ? [22] : [0], bBroadcast, 'SetScannerDigitalTubeSwitch');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerDigitalTubeSwitchAddr;
  return req;
}
Session.prototype.SetScannerDigitalTubeSwitch = async function SetScannerDigitalTubeSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isOpen: boolean
): Promise<void> {
  const req = createSetScannerDigitalTubeSwitch(addr, portAddr, scanBoardAddr, bBroadcast, isOpen);
  await this.connection.send(req);
};
Session.prototype.trySetScannerDigitalTubeSwitch = async function trySetScannerDigitalTubeSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isOpen: boolean
): Promise<ErrorType | null> {
  const req = createSetScannerDigitalTubeSwitch(addr, portAddr, scanBoardAddr, false, isOpen);
  return (await this.connection.trySend(req))?.ack ?? null;
};
