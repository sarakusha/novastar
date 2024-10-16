import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSmartSetMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadSmartSetMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSmartSetMode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.SmartSetModeOccupancy, 'ReadSmartSetMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SmartSetModeAddr;
  return req;
}
Session.prototype.ReadSmartSetMode = async function ReadSmartSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSmartSetMode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSmartSetMode = async function tryReadSmartSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSmartSetMode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
