import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerLowDelayEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lowDelayEnable: boolean
    ): Promise<void>;
    trySetScannerLowDelayEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lowDelayEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerLowDelayEnable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lowDelayEnable: boolean
): Request<Broadcast> {
  const req = new Request(lowDelayEnable ? [85] : [0], bBroadcast, 'SetScannerLowDelayEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerLowDelayEnableAddr;
  return req;
}
Session.prototype.SetScannerLowDelayEnable = async function SetScannerLowDelayEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lowDelayEnable: boolean
): Promise<void> {
  const req = createSetScannerLowDelayEnable(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    lowDelayEnable
  );
  await this.connection.send(req);
};
Session.prototype.trySetScannerLowDelayEnable = async function trySetScannerLowDelayEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lowDelayEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetScannerLowDelayEnable(addr, portAddr, scanBoardAddr, false, lowDelayEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
