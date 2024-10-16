import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_OE(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      DMThird: number[] | Buffer
    ): Promise<void>;
    trySetScanner_OE(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      DMThird: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_OE<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  DMThird: number[] | Buffer
): Request<Broadcast> {
  if (DMThird.length !== 0) throw new TypeError(`Invalid buffer size: ${DMThird.length}`);
  const req = new Request(DMThird, bBroadcast, 'SetScanner_OE');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_OEAAddr;
  return req;
}
Session.prototype.SetScanner_OE = async function SetScanner_OE(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  DMThird: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_OE(addr, portAddr, scanBoardAddr, bBroadcast, DMThird);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_OE = async function trySetScanner_OE(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  DMThird: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_OE(addr, portAddr, scanBoardAddr, false, DMThird);
  return (await this.connection.trySend(req))?.ack ?? null;
};
