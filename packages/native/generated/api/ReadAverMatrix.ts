import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAverMatrix(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadAverMatrix(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAverMatrix(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.AverMatrixOccupancy, 'ReadAverMatrix');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AverMatrixAddr;
  return req;
}
Session.prototype.ReadAverMatrix = async function ReadAverMatrix(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadAverMatrix(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAverMatrix = async function tryReadAverMatrix(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAverMatrix(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
