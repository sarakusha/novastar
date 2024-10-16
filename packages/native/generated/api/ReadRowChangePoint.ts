import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRowChangePoint(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadRowChangePoint(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadRowChangePoint(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.RowChangePointOccupancy, 'ReadRowChangePoint');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RowChangePointAddr;
  return req;
}
Session.prototype.ReadRowChangePoint = async function ReadRowChangePoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadRowChangePoint(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadRowChangePoint = async function tryReadRowChangePoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadRowChangePoint(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
