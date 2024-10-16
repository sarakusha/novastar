import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModuleWidthAndHeigth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadModuleWidthAndHeigth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModuleWidthAndHeigth(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ModuleWidthAndHeightOccupancy, 'ReadModuleWidthAndHeigth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleWidthAddr;
  return req;
}
Session.prototype.ReadModuleWidthAndHeigth = async function ReadModuleWidthAndHeigth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadModuleWidthAndHeigth(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadModuleWidthAndHeigth = async function tryReadModuleWidthAndHeigth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadModuleWidthAndHeigth(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
