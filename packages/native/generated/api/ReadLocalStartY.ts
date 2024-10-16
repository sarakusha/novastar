import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLocalStartY(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadLocalStartY(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLocalStartY(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.LocalStartYOccupancy, 'ReadLocalStartY');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LocalStartYAddr;
  return req;
}
Session.prototype.ReadLocalStartY = async function ReadLocalStartY(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadLocalStartY(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLocalStartY = async function tryReadLocalStartY(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLocalStartY(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
