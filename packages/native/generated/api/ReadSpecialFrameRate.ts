import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSpecialFrameRate(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadSpecialFrameRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSpecialFrameRate(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.SpecialFrameRateOccupancy, 'ReadSpecialFrameRate');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SpecialFrameRateAddr;
  return req;
}
Session.prototype.ReadSpecialFrameRate = async function ReadSpecialFrameRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSpecialFrameRate(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSpecialFrameRate = async function tryReadSpecialFrameRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSpecialFrameRate(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
