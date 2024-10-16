import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDoubleModelFrameRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadDoubleModelFrameRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDoubleModelFrameRate(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.DoubleModelCardSpaceRecordFreOccupancy,
    'ReadDoubleModelFrameRate'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceRecordFre;
  return req;
}
Session.prototype.ReadDoubleModelFrameRate = async function ReadDoubleModelFrameRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDoubleModelFrameRate(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDoubleModelFrameRate = async function tryReadDoubleModelFrameRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDoubleModelFrameRate(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
