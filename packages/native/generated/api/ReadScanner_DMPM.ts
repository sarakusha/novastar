import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_DMPM(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadScanner_DMPM(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_DMPM(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadScanner_DMPM');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmPMAAddr;
  return req;
}
Session.prototype.ReadScanner_DMPM = async function ReadScanner_DMPM(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadScanner_DMPM(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_DMPM = async function tryReadScanner_DMPM(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadScanner_DMPM(addr, portAddr, scanBoardAddr, readLength);
  return this.connection.trySend(req);
};
