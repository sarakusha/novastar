import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGclkPhase(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGclkPhase(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadGclkPhase(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GclkPhaseOccupancy, 'ReadGclkPhase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkPhaseAddr;
  return req;
}
Session.prototype.ReadGclkPhase = async function ReadGclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGclkPhase(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGclkPhase = async function tryReadGclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGclkPhase(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
