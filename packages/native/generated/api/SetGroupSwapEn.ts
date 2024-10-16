import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGroupSwapEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isEnableGroupSwapEn: boolean
    ): Promise<void>;
    trySetGroupSwapEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isEnableGroupSwapEn: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGroupSwapEn<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isEnableGroupSwapEn: boolean
): Request<Broadcast> {
  const req = new Request(isEnableGroupSwapEn ? [5] : [0], bBroadcast, 'SetGroupSwapEn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GroupSwapEnAddr;
  return req;
}
Session.prototype.SetGroupSwapEn = async function SetGroupSwapEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isEnableGroupSwapEn: boolean
): Promise<void> {
  const req = createSetGroupSwapEn(addr, portAddr, scanBoardAddr, bBroadcast, isEnableGroupSwapEn);
  await this.connection.send(req);
};
Session.prototype.trySetGroupSwapEn = async function trySetGroupSwapEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isEnableGroupSwapEn: boolean
): Promise<ErrorType | null> {
  const req = createSetGroupSwapEn(addr, portAddr, scanBoardAddr, false, isEnableGroupSwapEn);
  return (await this.connection.trySend(req))?.ack ?? null;
};
