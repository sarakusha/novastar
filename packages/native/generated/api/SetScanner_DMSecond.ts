import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_DMSecond(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      DMSecond: number[] | Buffer
    ): Promise<void>;
    trySetScanner_DMSecond(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      DMSecond: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_DMSecond<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  DMSecond: number[] | Buffer
): Request<Broadcast> {
  if (DMSecond.length !== 0) throw new TypeError(`Invalid buffer size: ${DMSecond.length}`);
  const req = new Request(DMSecond, bBroadcast, 'SetScanner_DMSecond');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmSecondAddr;
  return req;
}
Session.prototype.SetScanner_DMSecond = async function SetScanner_DMSecond(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  DMSecond: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_DMSecond(addr, portAddr, scanBoardAddr, bBroadcast, DMSecond);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_DMSecond = async function trySetScanner_DMSecond(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  DMSecond: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_DMSecond(addr, portAddr, scanBoardAddr, false, DMSecond);
  return (await this.connection.trySend(req))?.ack ?? null;
};
