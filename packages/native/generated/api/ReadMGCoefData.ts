import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMGCoefData(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadMGCoefData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMGCoefData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(256, 'ReadMGCoefData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MagicGrayLutAddr;
  return req;
}
Session.prototype.ReadMGCoefData = async function ReadMGCoefData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadMGCoefData(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadMGCoefData = async function tryReadMGCoefData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadMGCoefData(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
