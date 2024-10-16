import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanerDirectModeEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      broadcast: boolean,
      enable: boolean
    ): Promise<void>;
    trySetScanerDirectModeEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      enable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanerDirectModeEnable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  broadcast: Broadcast,
  enable: boolean
): Request<Broadcast> {
  const req = new Request(enable ? [5] : [0], broadcast, 'SetScanerDirectModeEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannderDirectModeEnableAddr;
  return req;
}
Session.prototype.SetScanerDirectModeEnable = async function SetScanerDirectModeEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  broadcast: boolean,
  enable: boolean
): Promise<void> {
  const req = createSetScanerDirectModeEnable(addr, portAddr, scanBoardAddr, broadcast, enable);
  await this.connection.send(req);
};
Session.prototype.trySetScanerDirectModeEnable = async function trySetScanerDirectModeEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  enable: boolean
): Promise<ErrorType | null> {
  const req = createSetScanerDirectModeEnable(addr, portAddr, scanBoardAddr, false, enable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
