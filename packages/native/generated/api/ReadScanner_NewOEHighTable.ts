import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_NewOEHighTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScanner_NewOEHighTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_NewOEHighTable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.NewOEHighTableOccupancy, 'ReadScanner_NewOEHighTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NewOEHighTableAddr;
  return req;
}
Session.prototype.ReadScanner_NewOEHighTable = async function ReadScanner_NewOEHighTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScanner_NewOEHighTable(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_NewOEHighTable = async function tryReadScanner_NewOEHighTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScanner_NewOEHighTable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
