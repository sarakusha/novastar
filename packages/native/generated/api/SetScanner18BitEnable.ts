import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner18BitEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      enable: boolean
    ): Promise<void>;
    trySetScanner18BitEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      enable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner18BitEnable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  enable: boolean
): Request<Broadcast> {
  const req = new Request(enable ? [5] : [0], bBroadcast, 'SetScanner18BitEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner18BitEnableAddr;
  return req;
}
Session.prototype.SetScanner18BitEnable = async function SetScanner18BitEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  enable: boolean
): Promise<void> {
  const req = createSetScanner18BitEnable(addr, portAddr, scanBoardAddr, bBroadcast, enable);
  await this.connection.send(req);
};
Session.prototype.trySetScanner18BitEnable = async function trySetScanner18BitEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  enable: boolean
): Promise<ErrorType | null> {
  const req = createSetScanner18BitEnable(addr, portAddr, scanBoardAddr, false, enable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
