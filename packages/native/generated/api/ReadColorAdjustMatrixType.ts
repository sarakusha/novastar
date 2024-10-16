import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadColorAdjustMatrixType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadColorAdjustMatrixType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadColorAdjustMatrixType(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerColorInfoOccupancy, 'ReadColorAdjustMatrixType');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorAdjustMatrixTypeAddr;
  return req;
}
Session.prototype.ReadColorAdjustMatrixType = async function ReadColorAdjustMatrixType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadColorAdjustMatrixType(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadColorAdjustMatrixType = async function tryReadColorAdjustMatrixType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadColorAdjustMatrixType(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
