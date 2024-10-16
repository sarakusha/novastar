import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerGrayScaleCoef(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScannerGrayScaleCoef(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerGrayScaleCoef(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ScannerGrayScaleBlueCoefOccupancy,
    'ReadScannerGrayScaleCoef'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_GrayScaleRedCoefAddr;
  return req;
}
Session.prototype.ReadScannerGrayScaleCoef = async function ReadScannerGrayScaleCoef(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScannerGrayScaleCoef(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScannerGrayScaleCoef = async function tryReadScannerGrayScaleCoef(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerGrayScaleCoef(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
