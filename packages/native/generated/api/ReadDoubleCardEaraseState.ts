import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDoubleCardEaraseState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadDoubleCardEaraseState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDoubleCardEaraseState(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.DoubleModelCardSpaceEaraseStateOccupancy,
    'ReadDoubleCardEaraseState'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceEaraseState;
  return req;
}
Session.prototype.ReadDoubleCardEaraseState = async function ReadDoubleCardEaraseState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDoubleCardEaraseState(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDoubleCardEaraseState = async function tryReadDoubleCardEaraseState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDoubleCardEaraseState(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
