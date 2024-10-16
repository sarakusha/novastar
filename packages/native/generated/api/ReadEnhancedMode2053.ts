import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadEnhancedMode2053(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadEnhancedMode2053(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadEnhancedMode2053(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.EnhancedMode2053Occupancy, 'ReadEnhancedMode2053');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.EnhancedMode2053Addr;
  return req;
}
Session.prototype.ReadEnhancedMode2053 = async function ReadEnhancedMode2053(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadEnhancedMode2053(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadEnhancedMode2053 = async function tryReadEnhancedMode2053(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadEnhancedMode2053(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
