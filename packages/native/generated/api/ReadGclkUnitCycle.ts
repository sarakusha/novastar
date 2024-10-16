import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGclkUnitCycle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGclkUnitCycle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGclkUnitCycle(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GclkUnitCycleOccupancy, 'ReadGclkUnitCycle');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkUnitCycleAddr;
  return req;
}
Session.prototype.ReadGclkUnitCycle = async function ReadGclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGclkUnitCycle(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGclkUnitCycle = async function tryReadGclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGclkUnitCycle(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
