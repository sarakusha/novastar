import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBlueBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadBlueBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadBlueBrightness(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.BlueBrightnessOccupancy, 'ReadBlueBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BlueBrightnessAddr;
  return req;
}
Session.prototype.ReadBlueBrightness = async function ReadBlueBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadBlueBrightness(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBlueBrightness = async function tryReadBlueBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBlueBrightness(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
