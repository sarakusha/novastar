import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDviEncyptEn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDviEncyptEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDviEncyptEn(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DviEncyptEnOccupancy, 'ReadDviEncyptEn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DviEncyptEnAddr;
  return req;
}
Session.prototype.ReadDviEncyptEn = async function ReadDviEncyptEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDviEncyptEn(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDviEncyptEn = async function tryReadDviEncyptEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDviEncyptEn(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
