import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviEncyptEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isDviEncypt: boolean
    ): Promise<void>;
    trySetDviEncyptEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isDviEncypt: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDviEncyptEn<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isDviEncypt: boolean
): Request<Broadcast> {
  const req = new Request(isDviEncypt ? [5] : [255], bBroadcast, 'SetDviEncyptEn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DviEncyptEnAddr;
  return req;
}
Session.prototype.SetDviEncyptEn = async function SetDviEncyptEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isDviEncypt: boolean
): Promise<void> {
  const req = createSetDviEncyptEn(addr, portAddr, scanBoardAddr, bBroadcast, isDviEncypt);
  await this.connection.send(req);
};
Session.prototype.trySetDviEncyptEn = async function trySetDviEncyptEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isDviEncypt: boolean
): Promise<ErrorType | null> {
  const req = createSetDviEncyptEn(addr, portAddr, scanBoardAddr, false, isDviEncypt);
  return (await this.connection.trySend(req))?.ack ?? null;
};
