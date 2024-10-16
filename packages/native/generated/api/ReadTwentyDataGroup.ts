import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTwentyDataGroup(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTwentyDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTwentyDataGroup(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.TwentyDataGroupOccupancy, 'ReadTwentyDataGroup');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TwentyDataGroupAddr;
  return req;
}
Session.prototype.ReadTwentyDataGroup = async function ReadTwentyDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTwentyDataGroup(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTwentyDataGroup = async function tryReadTwentyDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTwentyDataGroup(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
