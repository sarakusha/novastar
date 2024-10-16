import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModuleConfigInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadModuleConfigInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModuleConfigInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadModuleConfigInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleConfigInfoAddr;
  return req;
}
Session.prototype.ReadModuleConfigInfo = async function ReadModuleConfigInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadModuleConfigInfo(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadModuleConfigInfo = async function tryReadModuleConfigInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadModuleConfigInfo(addr, portAddr, scanBoardAddr, readLength);
  return this.connection.trySend(req);
};
