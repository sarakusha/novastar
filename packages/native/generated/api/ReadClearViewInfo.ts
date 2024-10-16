import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadClearViewInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadClearViewInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadClearViewInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerClearViewOccupancy, 'ReadClearViewInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerClearViewAddr;
  return req;
}
Session.prototype.ReadClearViewInfo = async function ReadClearViewInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadClearViewInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadClearViewInfo = async function tryReadClearViewInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadClearViewInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
