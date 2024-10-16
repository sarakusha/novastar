import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetClearViewEnableInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      enable: boolean
    ): Promise<void>;
    trySetClearViewEnableInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      enable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetClearViewEnableInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  enable: boolean
): Request<Broadcast> {
  const req = new Request(enable ? [5] : [0], bBroadcast, 'SetClearViewEnableInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerClearViewAddr;
  return req;
}
Session.prototype.SetClearViewEnableInfo = async function SetClearViewEnableInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  enable: boolean
): Promise<void> {
  const req = createSetClearViewEnableInfo(addr, portAddr, scanBoardAddr, bBroadcast, enable);
  await this.connection.send(req);
};
Session.prototype.trySetClearViewEnableInfo = async function trySetClearViewEnableInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  enable: boolean
): Promise<ErrorType | null> {
  const req = createSetClearViewEnableInfo(addr, portAddr, scanBoardAddr, false, enable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
