import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadColorAdjustEnable(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadColorAdjustEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadColorAdjustEnable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ColorAdjustEnableOccupancy, 'ReadColorAdjustEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorAdjustEnableAddr;
  return req;
}
Session.prototype.ReadColorAdjustEnable = async function ReadColorAdjustEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadColorAdjustEnable(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadColorAdjustEnable = async function tryReadColorAdjustEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadColorAdjustEnable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
