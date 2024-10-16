import { Packet, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    ReadScanerBurningProgramPackage(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadScanerBurningProgramPackage(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanerBurningProgramPackage(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadScanerBurningProgramPackage');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = 0;
  return req;
}
Session.prototype.ReadScanerBurningProgramPackage = async function ReadScanerBurningProgramPackage(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadScanerBurningProgramPackage(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanerBurningProgramPackage =
  async function tryReadScanerBurningProgramPackage(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Packet | null> {
    const req = createReadScanerBurningProgramPackage(addr, portAddr, scanBoardAddr, readLength);
    return this.connection.trySend(req);
  };
