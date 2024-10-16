import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadUCS512CDisplayMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadUCS512CDisplayMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadUCS512CDisplayMode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GrayBitOccupancy, 'ReadUCS512CDisplayMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.UCS512CDisplayModeAddr;
  return req;
}
Session.prototype.ReadUCS512CDisplayMode = async function ReadUCS512CDisplayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadUCS512CDisplayMode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadUCS512CDisplayMode = async function tryReadUCS512CDisplayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadUCS512CDisplayMode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
