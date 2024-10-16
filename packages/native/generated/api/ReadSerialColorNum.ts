import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSerialColorNum(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadSerialColorNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSerialColorNum(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.SerialColorNumOccupancy, 'ReadSerialColorNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SerialColorNumAddr;
  return req;
}
Session.prototype.ReadSerialColorNum = async function ReadSerialColorNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSerialColorNum(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSerialColorNum = async function tryReadSerialColorNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSerialColorNum(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
