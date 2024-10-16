import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRgbCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadRgbCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadRgbCode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.RgbCodeOccupancy, 'ReadRgbCode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RgbCodeAddr;
  return req;
}
Session.prototype.ReadRgbCode = async function ReadRgbCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadRgbCode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadRgbCode = async function tryReadRgbCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadRgbCode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
