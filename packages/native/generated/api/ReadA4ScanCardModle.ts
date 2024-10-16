import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadA4ScanCardModle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadA4ScanCardModle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadA4ScanCardModle(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.A4ScanCardModleOccupancy, 'ReadA4ScanCardModle');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.A4ScanCardModleAddr;
  return req;
}
Session.prototype.ReadA4ScanCardModle = async function ReadA4ScanCardModle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadA4ScanCardModle(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadA4ScanCardModle = async function tryReadA4ScanCardModle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadA4ScanCardModle(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
