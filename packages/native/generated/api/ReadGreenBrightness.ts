import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGreenBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGreenBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGreenBrightness(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GreenBrightnessOccupancy, 'ReadGreenBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GreenBrightnessAddr;
  return req;
}
Session.prototype.ReadGreenBrightness = async function ReadGreenBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGreenBrightness(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGreenBrightness = async function tryReadGreenBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGreenBrightness(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
