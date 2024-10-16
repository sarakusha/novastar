import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadNewOERamEnable(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadNewOERamEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadNewOERamEnable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.NewOERamEnableOccupancy, 'ReadNewOERamEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NewOERamEnableAddr;
  return req;
}
Session.prototype.ReadNewOERamEnable = async function ReadNewOERamEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadNewOERamEnable(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadNewOERamEnable = async function tryReadNewOERamEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadNewOERamEnable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
