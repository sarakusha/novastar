import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHumiOfScanCard(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadHumiOfScanCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadHumiOfScanCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Scanner_HumiOfScanCardOccupancy, 'ReadHumiOfScanCard');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_HumiOfScanCardAddr;
  return req;
}
Session.prototype.ReadHumiOfScanCard = async function ReadHumiOfScanCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadHumiOfScanCard(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadHumiOfScanCard = async function tryReadHumiOfScanCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadHumiOfScanCard(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
