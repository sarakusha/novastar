import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDclkPhase(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDclkPhase(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadDclkPhase(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DclkPhaseOccupancy, 'ReadDclkPhase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkPhaseAddr;
  return req;
}
Session.prototype.ReadDclkPhase = async function ReadDclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDclkPhase(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDclkPhase = async function tryReadDclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDclkPhase(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
