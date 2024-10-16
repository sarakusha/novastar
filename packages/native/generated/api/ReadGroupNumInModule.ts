import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGroupNumInModule(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGroupNumInModule(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGroupNumInModule(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GroupNumInModuleOccupancy, 'ReadGroupNumInModule');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GroupNumInModuleAddr;
  return req;
}
Session.prototype.ReadGroupNumInModule = async function ReadGroupNumInModule(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGroupNumInModule(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGroupNumInModule = async function tryReadGroupNumInModule(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGroupNumInModule(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
