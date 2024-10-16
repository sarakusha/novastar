import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGammaMaxValue2053(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGammaMaxValue2053(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGammaMaxValue2053(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GammaMaxValue2053Occupancy, 'ReadGammaMaxValue2053');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GammaMaxValue2053Addr;
  return req;
}
Session.prototype.ReadGammaMaxValue2053 = async function ReadGammaMaxValue2053(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGammaMaxValue2053(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGammaMaxValue2053 = async function tryReadGammaMaxValue2053(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGammaMaxValue2053(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
