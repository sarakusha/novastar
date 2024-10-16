import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPCMacAddr(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadPCMacAddr(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadPCMacAddr(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.PCMacAddrOccupancy, 'ReadPCMacAddr');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PCMacAddrAddr;
  return req;
}
Session.prototype.ReadPCMacAddr = async function ReadPCMacAddr(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadPCMacAddr(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadPCMacAddr = async function tryReadPCMacAddr(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadPCMacAddr(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
