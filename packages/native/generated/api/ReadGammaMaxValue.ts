import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGammaMaxValue(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGammaMaxValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGammaMaxValue(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GammaMaxValue2053Occupancy, 'ReadGammaMaxValue');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GammaMaxValue2053Addr;
  return req;
}
Session.prototype.ReadGammaMaxValue = async function ReadGammaMaxValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGammaMaxValue(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGammaMaxValue = async function tryReadGammaMaxValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGammaMaxValue(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
