import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGrayDepth(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGrayDepth(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadGrayDepth(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GrayDepthOccupancy, 'ReadGrayDepth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GrayDepthAddr;
  return req;
}
Session.prototype.ReadGrayDepth = async function ReadGrayDepth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGrayDepth(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGrayDepth = async function tryReadGrayDepth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGrayDepth(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
