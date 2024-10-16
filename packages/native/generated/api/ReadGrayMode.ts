import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGrayMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGrayMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadGrayMode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GrayModeOccupancy, 'ReadGrayMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GrayModeAddr;
  return req;
}
Session.prototype.ReadGrayMode = async function ReadGrayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGrayMode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGrayMode = async function tryReadGrayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGrayMode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
