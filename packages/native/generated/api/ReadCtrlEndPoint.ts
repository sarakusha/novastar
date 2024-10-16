import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCtrlEndPoint(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadCtrlEndPoint(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCtrlEndPoint(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.CtrlEndPointOccupancy, 'ReadCtrlEndPoint');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CtrlEndPointAddr;
  return req;
}
Session.prototype.ReadCtrlEndPoint = async function ReadCtrlEndPoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadCtrlEndPoint(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCtrlEndPoint = async function tryReadCtrlEndPoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadCtrlEndPoint(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
