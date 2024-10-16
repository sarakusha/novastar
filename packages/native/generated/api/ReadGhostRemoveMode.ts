import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGhostRemoveMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGhostRemoveMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGhostRemoveMode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GhostRemoveModeOccupancy, 'ReadGhostRemoveMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GhostRemoveModeAddr;
  return req;
}
Session.prototype.ReadGhostRemoveMode = async function ReadGhostRemoveMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGhostRemoveMode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGhostRemoveMode = async function tryReadGhostRemoveMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGhostRemoveMode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
