import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMGEnParmData(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadMGEnParmData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMGEnParmData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.MGEnParmccupancy, 'ReadMGEnParmData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MGEnParmAddr;
  return req;
}
Session.prototype.ReadMGEnParmData = async function ReadMGEnParmData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadMGEnParmData(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMGEnParmData = async function tryReadMGEnParmData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadMGEnParmData(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
