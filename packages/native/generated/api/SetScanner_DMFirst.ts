import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_DMFirst(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      DMFirst: number[] | Buffer
    ): Promise<void>;
    trySetScanner_DMFirst(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      DMFirst: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_DMFirst<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  DMFirst: number[] | Buffer
): Request<Broadcast> {
  if (DMFirst.length !== 0) throw new TypeError(`Invalid buffer size: ${DMFirst.length}`);
  const req = new Request(DMFirst, bBroadcast, 'SetScanner_DMFirst');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmFirstAddr;
  return req;
}
Session.prototype.SetScanner_DMFirst = async function SetScanner_DMFirst(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  DMFirst: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_DMFirst(addr, portAddr, scanBoardAddr, bBroadcast, DMFirst);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_DMFirst = async function trySetScanner_DMFirst(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  DMFirst: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_DMFirst(addr, portAddr, scanBoardAddr, false, DMFirst);
  return (await this.connection.trySend(req))?.ack ?? null;
};
