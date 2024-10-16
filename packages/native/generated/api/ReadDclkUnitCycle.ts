import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDclkUnitCycle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDclkUnitCycle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDclkUnitCycle(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DclkUnitCycleOccupancy, 'ReadDclkUnitCycle');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkUnitCycleAddr;
  return req;
}
Session.prototype.ReadDclkUnitCycle = async function ReadDclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDclkUnitCycle(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDclkUnitCycle = async function tryReadDclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDclkUnitCycle(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
