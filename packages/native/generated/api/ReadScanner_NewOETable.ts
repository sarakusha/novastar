import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_NewOETable(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadScanner_NewOETable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_NewOETable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.NewOETableOccupancy, 'ReadScanner_NewOETable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NewOETableAddr;
  return req;
}
Session.prototype.ReadScanner_NewOETable = async function ReadScanner_NewOETable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScanner_NewOETable(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_NewOETable = async function tryReadScanner_NewOETable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScanner_NewOETable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
