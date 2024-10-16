import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMagnitudes(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadMagnitudes(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMagnitudes(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.MagnitudesAddrOccupancy, 'ReadMagnitudes');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MagnitudesAddr;
  return req;
}
Session.prototype.ReadMagnitudes = async function ReadMagnitudes(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadMagnitudes(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadMagnitudes = async function tryReadMagnitudes(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadMagnitudes(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
