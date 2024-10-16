import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScaleInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScaleInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadScaleInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScaleInfoOccupancy, 'ReadScaleInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScaleInfoAddr;
  return req;
}
Session.prototype.ReadScaleInfo = async function ReadScaleInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScaleInfo(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScaleInfo = async function tryReadScaleInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScaleInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
