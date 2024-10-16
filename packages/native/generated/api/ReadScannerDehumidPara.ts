import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerDehumidPara(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadScannerDehumidPara(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerDehumidPara(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DehumidParaAddrOccupancy, 'ReadScannerDehumidPara');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DehumidParaAddr;
  return req;
}
Session.prototype.ReadScannerDehumidPara = async function ReadScannerDehumidPara(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScannerDehumidPara(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScannerDehumidPara = async function tryReadScannerDehumidPara(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerDehumidPara(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
