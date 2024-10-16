import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTVCardDVI0OffsetY(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTVCardDVI0OffsetY(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTVCardDVI0OffsetY(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.TVCardDVI0OffsetYOccupancy, 'ReadTVCardDVI0OffsetY');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0OffsetYAddr;
  return req;
}
Session.prototype.ReadTVCardDVI0OffsetY = async function ReadTVCardDVI0OffsetY(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTVCardDVI0OffsetY(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTVCardDVI0OffsetY = async function tryReadTVCardDVI0OffsetY(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTVCardDVI0OffsetY(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
