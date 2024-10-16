import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadABCDCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadABCDCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadABCDCode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ABCDCodeOccupancy, 'ReadABCDCode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ABCDCodeAddr;
  return req;
}
Session.prototype.ReadABCDCode = async function ReadABCDCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadABCDCode(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadABCDCode = async function tryReadABCDCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadABCDCode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
