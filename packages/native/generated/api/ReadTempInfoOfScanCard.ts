import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTempInfoOfScanCard(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTempInfoOfScanCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTempInfoOfScanCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_TempInfoOfScanCardOccupancy,
    'ReadTempInfoOfScanCard'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_TempInfoOfScanCardhAddr;
  return req;
}
Session.prototype.ReadTempInfoOfScanCard = async function ReadTempInfoOfScanCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTempInfoOfScanCard(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTempInfoOfScanCard = async function tryReadTempInfoOfScanCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTempInfoOfScanCard(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
