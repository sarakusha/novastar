import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDoubleCardSpace(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDoubleCardSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDoubleCardSpace(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.DoubleModelCardSpaceCardSpaceOccupancy,
    'ReadDoubleCardSpace'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceCardSpace;
  return req;
}
Session.prototype.ReadDoubleCardSpace = async function ReadDoubleCardSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDoubleCardSpace(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDoubleCardSpace = async function tryReadDoubleCardSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDoubleCardSpace(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
