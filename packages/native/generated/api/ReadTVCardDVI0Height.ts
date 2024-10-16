import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTVCardDVI0Height(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTVCardDVI0Height(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTVCardDVI0Height(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.TVCardDVI0HeightOccupancy, 'ReadTVCardDVI0Height');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0HeightAddr;
  return req;
}
Session.prototype.ReadTVCardDVI0Height = async function ReadTVCardDVI0Height(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTVCardDVI0Height(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTVCardDVI0Height = async function tryReadTVCardDVI0Height(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTVCardDVI0Height(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
