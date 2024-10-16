import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_LowGrayCodeTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScanner_LowGrayCodeTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_LowGrayCodeTable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.LowGrayCodeTableOccupancy, 'ReadScanner_LowGrayCodeTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowGrayCodeTableAddr;
  return req;
}
Session.prototype.ReadScanner_LowGrayCodeTable = async function ReadScanner_LowGrayCodeTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScanner_LowGrayCodeTable(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_LowGrayCodeTable = async function tryReadScanner_LowGrayCodeTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScanner_LowGrayCodeTable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
