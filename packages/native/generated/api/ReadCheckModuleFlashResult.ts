import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCheckModuleFlashResult(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadCheckModuleFlashResult(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCheckModuleFlashResult(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.CheckModuleFlashResultOccupancy,
    'ReadCheckModuleFlashResult'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CheckModuleFlashResultAddr;
  return req;
}
Session.prototype.ReadCheckModuleFlashResult = async function ReadCheckModuleFlashResult(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadCheckModuleFlashResult(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadCheckModuleFlashResult = async function tryReadCheckModuleFlashResult(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadCheckModuleFlashResult(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
