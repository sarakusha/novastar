import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRGBBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadRGBBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadRGBBrightness(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.RGBBrightnessOccupancy, 'ReadRGBBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RGBBrightnessAddr;
  return req;
}
Session.prototype.ReadRGBBrightness = async function ReadRGBBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadRGBBrightness(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadRGBBrightness = async function tryReadRGBBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadRGBBrightness(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
