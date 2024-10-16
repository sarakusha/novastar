import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRefNumPerVs(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadRefNumPerVs(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadRefNumPerVs(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.RefNumPerVsOccupancy, 'ReadRefNumPerVs');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RefNumPerVsAddr;
  return req;
}
Session.prototype.ReadRefNumPerVs = async function ReadRefNumPerVs(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadRefNumPerVs(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadRefNumPerVs = async function tryReadRefNumPerVs(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadRefNumPerVs(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
