import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadColorMatrix(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadColorMatrix(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadColorMatrix(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ColorMatrixOccupancy * AddressMapping.ColorMatrixNum,
    'ReadColorMatrix'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorMatrixAddr;
  return req;
}
Session.prototype.ReadColorMatrix = async function ReadColorMatrix(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadColorMatrix(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadColorMatrix = async function tryReadColorMatrix(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadColorMatrix(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
