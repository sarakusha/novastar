import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_DMThird(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadScanner_DMThird(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_DMThird(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadScanner_DMThird');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmThirdAAddr;
  return req;
}
Session.prototype.ReadScanner_DMThird = async function ReadScanner_DMThird(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadScanner_DMThird(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_DMThird = async function tryReadScanner_DMThird(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadScanner_DMThird(addr, portAddr, scanBoardAddr, readLength);
  return this.connection.trySend(req);
};
