import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadControlWidth(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadControlWidth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadControlWidth(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ControlWidthOccupancy, 'ReadControlWidth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ControlWidthAddr;
  return req;
}
Session.prototype.ReadControlWidth = async function ReadControlWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadControlWidth(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadControlWidth = async function tryReadControlWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadControlWidth(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
