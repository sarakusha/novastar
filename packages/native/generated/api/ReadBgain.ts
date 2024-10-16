import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBgain(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadBgain(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadBgain(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.BgainOccupancy, 'ReadBgain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BgainAddr;
  return req;
}
Session.prototype.ReadBgain = async function ReadBgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadBgain(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBgain = async function tryReadBgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBgain(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
