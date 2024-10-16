import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModuleHeight(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadModuleHeight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModuleHeight(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ModuleHeightOccupancy, 'ReadModuleHeight');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleHeightAddr;
  return req;
}
Session.prototype.ReadModuleHeight = async function ReadModuleHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadModuleHeight(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadModuleHeight = async function tryReadModuleHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadModuleHeight(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
