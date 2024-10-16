import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner18BitEnable(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScanner18BitEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner18BitEnable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Scanner18BitEnableOccupancy, 'ReadScanner18BitEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner18BitEnableAddr;
  return req;
}
Session.prototype.ReadScanner18BitEnable = async function ReadScanner18BitEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScanner18BitEnable(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScanner18BitEnable = async function tryReadScanner18BitEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScanner18BitEnable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
