import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTVCardDVI0OffsetX(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTVCardDVI0OffsetX(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTVCardDVI0OffsetX(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.TVCardDVI0OffsetXOccupancy, 'ReadTVCardDVI0OffsetX');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0OffsetXAddr;
  return req;
}
Session.prototype.ReadTVCardDVI0OffsetX = async function ReadTVCardDVI0OffsetX(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTVCardDVI0OffsetX(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTVCardDVI0OffsetX = async function tryReadTVCardDVI0OffsetX(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTVCardDVI0OffsetX(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
