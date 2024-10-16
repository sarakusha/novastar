import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadABCDRollOver(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadABCDRollOver(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadABCDRollOver(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ABCDRollOverOccupancy, 'ReadABCDRollOver');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ABCDRollOverAddr;
  return req;
}
Session.prototype.ReadABCDRollOver = async function ReadABCDRollOver(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadABCDRollOver(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadABCDRollOver = async function tryReadABCDRollOver(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadABCDRollOver(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
