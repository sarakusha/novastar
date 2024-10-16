import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLCDSwitch(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadLCDSwitch(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadLCDSwitch(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.LCDSwitchOccupancy, 'ReadLCDSwitch');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LCDSwitchAddr;
  return req;
}
Session.prototype.ReadLCDSwitch = async function ReadLCDSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadLCDSwitch(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLCDSwitch = async function tryReadLCDSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLCDSwitch(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
