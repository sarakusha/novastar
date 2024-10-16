import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModuleWidth(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadModuleWidth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModuleWidth(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ModuleWidthOccupancy, 'ReadModuleWidth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleWidthAddr;
  return req;
}
Session.prototype.ReadModuleWidth = async function ReadModuleWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadModuleWidth(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadModuleWidth = async function tryReadModuleWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadModuleWidth(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
