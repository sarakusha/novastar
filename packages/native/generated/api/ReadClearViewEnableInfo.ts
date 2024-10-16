import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadClearViewEnableInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadClearViewEnableInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadClearViewEnableInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerClearViewEnable, 'ReadClearViewEnableInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerClearViewAddr;
  return req;
}
Session.prototype.ReadClearViewEnableInfo = async function ReadClearViewEnableInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadClearViewEnableInfo(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadClearViewEnableInfo = async function tryReadClearViewEnableInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadClearViewEnableInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
