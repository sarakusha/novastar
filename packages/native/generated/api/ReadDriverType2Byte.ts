import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDriverType2Byte(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDriverType2Byte(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDriverType2Byte(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DriverTypeOccupancy2Byte, 'ReadDriverType2Byte');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DriverTypeAddr2Byte;
  return req;
}
Session.prototype.ReadDriverType2Byte = async function ReadDriverType2Byte(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDriverType2Byte(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDriverType2Byte = async function tryReadDriverType2Byte(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDriverType2Byte(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
