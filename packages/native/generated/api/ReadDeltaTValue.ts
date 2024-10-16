import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDeltaTValue(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDeltaTValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDeltaTValue(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DeltaTOccupancy, 'ReadDeltaTValue');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DeltaTAddr;
  return req;
}
Session.prototype.ReadDeltaTValue = async function ReadDeltaTValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDeltaTValue(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDeltaTValue = async function tryReadDeltaTValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDeltaTValue(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
