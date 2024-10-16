import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadReduceHighContrast(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadReduceHighContrast(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadReduceHighContrast(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ReduceHighContrastOccupancy, 'ReadReduceHighContrast');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReduceHighContrastAddr;
  return req;
}
Session.prototype.ReadReduceHighContrast = async function ReadReduceHighContrast(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadReduceHighContrast(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadReduceHighContrast = async function tryReadReduceHighContrast(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadReduceHighContrast(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
