import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScreenDriveType(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScreenDriveType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScreenDriveType(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ScreenDriveTypeOccupancy, 'ReadScreenDriveType');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScreenDriveTypeAddr;
  return req;
}
Session.prototype.ReadScreenDriveType = async function ReadScreenDriveType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScreenDriveType(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScreenDriveType = async function tryReadScreenDriveType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScreenDriveType(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
