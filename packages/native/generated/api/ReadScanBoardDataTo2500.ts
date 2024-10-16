import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanBoardDataTo2500(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      length: number
    ): Promise<Buffer>;
    tryReadScanBoardDataTo2500(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      length: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanBoardDataTo2500(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  length: number
): Request {
  const req = new Request(length, 'ReadScanBoardDataTo2500');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SDKNewReadOrWriteAddr;
  return req;
}
Session.prototype.ReadScanBoardDataTo2500 = async function ReadScanBoardDataTo2500(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  length: number
): Promise<Buffer> {
  const req = createReadScanBoardDataTo2500(addr, portAddr, scanBoardAddr, length);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanBoardDataTo2500 = async function tryReadScanBoardDataTo2500(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  length: number
): Promise<Packet | null> {
  const req = createReadScanBoardDataTo2500(addr, portAddr, scanBoardAddr, length);
  return this.connection.trySend(req);
};
