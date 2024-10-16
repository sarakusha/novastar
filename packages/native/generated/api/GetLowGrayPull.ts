import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    GetLowGrayPull(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryGetLowGrayPull(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createGetLowGrayPull(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScannerLowGreyOccupancy, 'GetLowGrayPull');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerLowGrayAddr;
  return req;
}
Session.prototype.GetLowGrayPull = async function GetLowGrayPull(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createGetLowGrayPull(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryGetLowGrayPull = async function tryGetLowGrayPull(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createGetLowGrayPull(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
