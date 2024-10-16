import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDclkHighRatio(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDclkHighRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDclkHighRatio(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DclkHighRatioOccupancy, 'ReadDclkHighRatio');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkHighRatioAddr;
  return req;
}
Session.prototype.ReadDclkHighRatio = async function ReadDclkHighRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDclkHighRatio(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDclkHighRatio = async function tryReadDclkHighRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDclkHighRatio(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
