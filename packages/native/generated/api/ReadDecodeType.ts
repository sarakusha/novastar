import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDecodeType(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDecodeType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDecodeType(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DecodeTypeOccupancy, 'ReadDecodeType');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DecodeTypeAddr;
  return req;
}
Session.prototype.ReadDecodeType = async function ReadDecodeType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDecodeType(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDecodeType = async function tryReadDecodeType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDecodeType(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
