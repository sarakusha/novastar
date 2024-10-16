import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCorrectionOn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadCorrectionOn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCorrectionOn(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.CorrectionOnOccupancy, 'ReadCorrectionOn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnAddr;
  return req;
}
Session.prototype.ReadCorrectionOn = async function ReadCorrectionOn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadCorrectionOn(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCorrectionOn = async function tryReadCorrectionOn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadCorrectionOn(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
