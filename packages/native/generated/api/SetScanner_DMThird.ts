import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_DMThird(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      DMThird: number[] | Buffer
    ): Promise<void>;
    trySetScanner_DMThird(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      DMThird: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_DMThird<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  DMThird: number[] | Buffer
): Request<Broadcast> {
  if (DMThird.length !== 0) throw new TypeError(`Invalid buffer size: ${DMThird.length}`);
  const req = new Request(DMThird, bBroadcast, 'SetScanner_DMThird');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmThirdAAddr;
  return req;
}
Session.prototype.SetScanner_DMThird = async function SetScanner_DMThird(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  DMThird: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_DMThird(addr, portAddr, scanBoardAddr, bBroadcast, DMThird);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_DMThird = async function trySetScanner_DMThird(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  DMThird: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_DMThird(addr, portAddr, scanBoardAddr, false, DMThird);
  return (await this.connection.trySend(req))?.ack ?? null;
};
