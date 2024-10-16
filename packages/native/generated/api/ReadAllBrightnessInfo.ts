import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllBrightnessInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadAllBrightnessInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAllBrightnessInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.AllBrightnessInfoOccupancy, 'ReadAllBrightnessInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AllBrightnessInfoAddr;
  return req;
}
Session.prototype.ReadAllBrightnessInfo = async function ReadAllBrightnessInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadAllBrightnessInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllBrightnessInfo = async function tryReadAllBrightnessInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAllBrightnessInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
