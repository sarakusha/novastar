import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCabinetSerialNum(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadCabinetSerialNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCabinetSerialNum(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.CabinetSerialNumOccupancy, 'ReadCabinetSerialNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CabinetSerialNumAddr;
  return req;
}
Session.prototype.ReadCabinetSerialNum = async function ReadCabinetSerialNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadCabinetSerialNum(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCabinetSerialNum = async function tryReadCabinetSerialNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadCabinetSerialNum(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
