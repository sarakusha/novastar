import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCoefficientSource(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadCoefficientSource(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCoefficientSource(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.CoefficientSourceOccupancy, 'ReadCoefficientSource');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientSourceAddr;
  return req;
}
Session.prototype.ReadCoefficientSource = async function ReadCoefficientSource(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadCoefficientSource(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCoefficientSource = async function tryReadCoefficientSource(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadCoefficientSource(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
