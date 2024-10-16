import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerRT5958TinyLineFeed(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadScannerRT5958TinyLineFeed(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerRT5958TinyLineFeed(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadScannerRT5958TinyLineFeed');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReadRT5958TinyLineFeedAddr;
  return req;
}
Session.prototype.ReadScannerRT5958TinyLineFeed = async function ReadScannerRT5958TinyLineFeed(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadScannerRT5958TinyLineFeed(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerRT5958TinyLineFeed =
  async function tryReadScannerRT5958TinyLineFeed(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Packet | null> {
    const req = createReadScannerRT5958TinyLineFeed(addr, portAddr, scanBoardAddr, readLength);
    return this.connection.trySend(req);
  };
