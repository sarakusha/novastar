import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMbi5042GrayEnhanced(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadMbi5042GrayEnhanced(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMbi5042GrayEnhanced(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Mbi5042GrayEnhancedOccupancy, 'ReadMbi5042GrayEnhanced');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Mbi5042GrayEnhancedAddr;
  return req;
}
Session.prototype.ReadMbi5042GrayEnhanced = async function ReadMbi5042GrayEnhanced(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadMbi5042GrayEnhanced(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMbi5042GrayEnhanced = async function tryReadMbi5042GrayEnhanced(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadMbi5042GrayEnhanced(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
