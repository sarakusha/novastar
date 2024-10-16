import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadABCDESignalDelay(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadABCDESignalDelay(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadABCDESignalDelay(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ABCDESignalDelayOccupancy, 'ReadABCDESignalDelay');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ABCDESignalDelayAddr;
  return req;
}
Session.prototype.ReadABCDESignalDelay = async function ReadABCDESignalDelay(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadABCDESignalDelay(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadABCDESignalDelay = async function tryReadABCDESignalDelay(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadABCDESignalDelay(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
