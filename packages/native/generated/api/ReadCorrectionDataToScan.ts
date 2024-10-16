import { Packet, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    ReadCorrectionDataToScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number,
      registerAddr: number
    ): Promise<Buffer>;
    tryReadCorrectionDataToScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number,
      registerAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCorrectionDataToScan(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number,
  registerAddr: number
): Request {
  const req = new Request(readLength, 'ReadCorrectionDataToScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = registerAddr;
  return req;
}
Session.prototype.ReadCorrectionDataToScan = async function ReadCorrectionDataToScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number,
  registerAddr: number
): Promise<Buffer> {
  const req = createReadCorrectionDataToScan(
    addr,
    portAddr,
    scanBoardAddr,
    readLength,
    registerAddr
  );
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadCorrectionDataToScan = async function tryReadCorrectionDataToScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number,
  registerAddr: number
): Promise<Packet | null> {
  const req = createReadCorrectionDataToScan(
    addr,
    portAddr,
    scanBoardAddr,
    readLength,
    registerAddr
  );
  return this.connection.trySend(req);
};
