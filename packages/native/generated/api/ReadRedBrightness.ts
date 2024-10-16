import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRedBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadRedBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadRedBrightness(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.RedBrightnessOccupancy, 'ReadRedBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RedBrightnessAddr;
  return req;
}
Session.prototype.ReadRedBrightness = async function ReadRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadRedBrightness(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadRedBrightness = async function tryReadRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadRedBrightness(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
