import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMoudleNumber(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadMoudleNumber(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMoudleNumber(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerMoudleNumberOccupancy, 'ReadMoudleNumber');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanneMoudleNumberAddr;
  return req;
}
Session.prototype.ReadMoudleNumber = async function ReadMoudleNumber(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadMoudleNumber(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMoudleNumber = async function tryReadMoudleNumber(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadMoudleNumber(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
