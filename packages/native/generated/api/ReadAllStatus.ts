import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllStatus(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadAllStatus(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadAllStatus(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Scanner_AllMonitorDataOccupancy, 'ReadAllStatus');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_AllMonitorDataAddr;
  return req;
}
Session.prototype.ReadAllStatus = async function ReadAllStatus(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadAllStatus(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllStatus = async function tryReadAllStatus(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAllStatus(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
