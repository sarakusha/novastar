import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLocalStartX(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadLocalStartX(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLocalStartX(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.LocalStartXOccupancy, 'ReadLocalStartX');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LocalStartXAddr;
  return req;
}
Session.prototype.ReadLocalStartX = async function ReadLocalStartX(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadLocalStartX(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLocalStartX = async function tryReadLocalStartX(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLocalStartX(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
