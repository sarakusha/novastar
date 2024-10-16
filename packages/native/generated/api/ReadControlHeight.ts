import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadControlHeight(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadControlHeight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadControlHeight(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ControlHeightOccupancy, 'ReadControlHeight');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ControlHeightAddr;
  return req;
}
Session.prototype.ReadControlHeight = async function ReadControlHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadControlHeight(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadControlHeight = async function tryReadControlHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadControlHeight(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
