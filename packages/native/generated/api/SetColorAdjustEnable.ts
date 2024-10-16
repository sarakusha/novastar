import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetColorAdjustEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetColorAdjustEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetColorAdjustEnable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request(isEnable ? [2] : [255], bBroadcast, 'SetColorAdjustEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorAdjustEnableAddr;
  return req;
}
Session.prototype.SetColorAdjustEnable = async function SetColorAdjustEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isEnable: boolean
): Promise<void> {
  const req = createSetColorAdjustEnable(addr, portAddr, scanBoardAddr, bBroadcast, isEnable);
  await this.connection.send(req);
};
Session.prototype.trySetColorAdjustEnable = async function trySetColorAdjustEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetColorAdjustEnable(addr, portAddr, scanBoardAddr, false, isEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
