import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLowAshCompensationTwo5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadLowAshCompensationTwo5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLowAshCompensationTwo5253Value(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.LowAshCompensationTwo5253Occupancy,
    'ReadLowAshCompensationTwo5253Value'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowAshCompensationTwo5253Addr;
  return req;
}
Session.prototype.ReadLowAshCompensationTwo5253Value =
  async function ReadLowAshCompensationTwo5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createReadLowAshCompensationTwo5253Value(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadLowAshCompensationTwo5253Value =
  async function tryReadLowAshCompensationTwo5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadLowAshCompensationTwo5253Value(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
