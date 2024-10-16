import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScanner_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_FPGAProgramInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_FPGAProgramInfoOccupancy,
    'ReadScanner_FPGAProgramInfo'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramInfoAddr;
  return req;
}
Session.prototype.ReadScanner_FPGAProgramInfo = async function ReadScanner_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScanner_FPGAProgramInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_FPGAProgramInfo = async function tryReadScanner_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScanner_FPGAProgramInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
