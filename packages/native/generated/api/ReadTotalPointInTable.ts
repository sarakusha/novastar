import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTotalPointInTable(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTotalPointInTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTotalPointInTable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.TotalPointInTableOccupancy, 'ReadTotalPointInTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalPointInTableAddr;
  return req;
}
Session.prototype.ReadTotalPointInTable = async function ReadTotalPointInTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTotalPointInTable(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTotalPointInTable = async function tryReadTotalPointInTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTotalPointInTable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
