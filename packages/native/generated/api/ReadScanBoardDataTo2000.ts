import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanBoardDataTo2000(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      length: number
    ): Promise<Buffer>;
    tryReadScanBoardDataTo2000(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      length: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanBoardDataTo2000(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  length: number
): Request {
  const req = new Request(length, 'ReadScanBoardDataTo2000');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SDKReadOrWriteAddr;
  return req;
}
Session.prototype.ReadScanBoardDataTo2000 = async function ReadScanBoardDataTo2000(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  length: number
): Promise<Buffer> {
  const req = createReadScanBoardDataTo2000(addr, portAddr, scanBoardAddr, length);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanBoardDataTo2000 = async function tryReadScanBoardDataTo2000(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  length: number
): Promise<Packet | null> {
  const req = createReadScanBoardDataTo2000(addr, portAddr, scanBoardAddr, length);
  return this.connection.trySend(req);
};
