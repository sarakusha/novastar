import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadConfigRegister(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadConfigRegister(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadConfigRegister(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ReadConfigRegisterOccupancy, 'ReadConfigRegister');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReadConfigRegisterAddr;
  return req;
}
Session.prototype.ReadConfigRegister = async function ReadConfigRegister(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadConfigRegister(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadConfigRegister = async function tryReadConfigRegister(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadConfigRegister(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
