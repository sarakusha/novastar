import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAddrExtend(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadAddrExtend(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAddrExtend(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.AddrExtendOccupancy, 'ReadAddrExtend');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AddrExtendAddr;
  return req;
}
Session.prototype.ReadAddrExtend = async function ReadAddrExtend(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadAddrExtend(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadAddrExtend = async function tryReadAddrExtend(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAddrExtend(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
