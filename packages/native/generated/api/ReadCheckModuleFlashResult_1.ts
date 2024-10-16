import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCheckModuleFlashResult_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readDataLength: number
    ): Promise<Buffer>;
    tryReadCheckModuleFlashResult_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readDataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCheckModuleFlashResult_1(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readDataLength: number
): Request {
  const req = new Request(readDataLength, 'ReadCheckModuleFlashResult_1');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CheckModuleFlashResultAddr + 16;
  return req;
}
Session.prototype.ReadCheckModuleFlashResult_1 = async function ReadCheckModuleFlashResult_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readDataLength: number
): Promise<Buffer> {
  const req = createReadCheckModuleFlashResult_1(addr, portAddr, scanBoardAddr, readDataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadCheckModuleFlashResult_1 = async function tryReadCheckModuleFlashResult_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readDataLength: number
): Promise<Packet | null> {
  const req = createReadCheckModuleFlashResult_1(addr, portAddr, scanBoardAddr, readDataLength);
  return this.connection.trySend(req);
};
