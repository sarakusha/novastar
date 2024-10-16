import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerRT5958TinyAfterglow(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadScannerRT5958TinyAfterglow(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerRT5958TinyAfterglow(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadScannerRT5958TinyAfterglow');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReadRT5958TinyAfterglowAddr;
  return req;
}
Session.prototype.ReadScannerRT5958TinyAfterglow = async function ReadScannerRT5958TinyAfterglow(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadScannerRT5958TinyAfterglow(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerRT5958TinyAfterglow =
  async function tryReadScannerRT5958TinyAfterglow(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Packet | null> {
    const req = createReadScannerRT5958TinyAfterglow(addr, portAddr, scanBoardAddr, readLength);
    return this.connection.trySend(req);
  };
