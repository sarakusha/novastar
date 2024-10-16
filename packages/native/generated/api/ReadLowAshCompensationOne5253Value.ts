import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLowAshCompensationOne5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadLowAshCompensationOne5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLowAshCompensationOne5253Value(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.LowAshCompensationOne5253Occupancy,
    'ReadLowAshCompensationOne5253Value'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowAshCompensationOne5253Addr;
  return req;
}
Session.prototype.ReadLowAshCompensationOne5253Value =
  async function ReadLowAshCompensationOne5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createReadLowAshCompensationOne5253Value(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadLowAshCompensationOne5253Value =
  async function tryReadLowAshCompensationOne5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadLowAshCompensationOne5253Value(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
