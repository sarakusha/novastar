import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBlankingTime5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadBlankingTime5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadBlankingTime5253Value(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.BlankingTime5253Occupancy, 'ReadBlankingTime5253Value');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BlankingTime5253Addr;
  return req;
}
Session.prototype.ReadBlankingTime5253Value = async function ReadBlankingTime5253Value(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadBlankingTime5253Value(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBlankingTime5253Value = async function tryReadBlankingTime5253Value(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBlankingTime5253Value(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
