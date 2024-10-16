import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBrightnessModel(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadBrightnessModel(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadBrightnessModel(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.BrightnessModelOccupancy, 'ReadBrightnessModel');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BrightnessModelAddr;
  return req;
}
Session.prototype.ReadBrightnessModel = async function ReadBrightnessModel(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadBrightnessModel(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBrightnessModel = async function tryReadBrightnessModel(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBrightnessModel(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
