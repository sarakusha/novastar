import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_DMSecond(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadScanner_DMSecond(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_DMSecond(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadScanner_DMSecond');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmSecondAddr;
  return req;
}
Session.prototype.ReadScanner_DMSecond = async function ReadScanner_DMSecond(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadScanner_DMSecond(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_DMSecond = async function tryReadScanner_DMSecond(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadScanner_DMSecond(addr, portAddr, scanBoardAddr, readLength);
  return this.connection.trySend(req);
};
