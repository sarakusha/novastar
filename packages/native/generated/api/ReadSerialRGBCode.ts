import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSerialRGBCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadSerialRGBCode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSerialRGBCode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.SerialRGBCodeOccupancy, 'ReadSerialRGBCode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SerialRGBCodeAddr;
  return req;
}
Session.prototype.ReadSerialRGBCode = async function ReadSerialRGBCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSerialRGBCode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSerialRGBCode = async function tryReadSerialRGBCode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSerialRGBCode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
