import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVRedBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadVRedBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadVRedBrightness(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.VRedBrightnessOccupancy, 'ReadVRedBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.VRedBrightnessAddr;
  return req;
}
Session.prototype.ReadVRedBrightness = async function ReadVRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadVRedBrightness(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVRedBrightness = async function tryReadVRedBrightness(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadVRedBrightness(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
