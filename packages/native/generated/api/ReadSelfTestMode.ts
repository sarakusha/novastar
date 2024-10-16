import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSelfTestMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadSelfTestMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSelfTestMode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.SelfTestModeOccupancy, 'ReadSelfTestMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SelfTestModeAddr;
  return req;
}
Session.prototype.ReadSelfTestMode = async function ReadSelfTestMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSelfTestMode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSelfTestMode = async function tryReadSelfTestMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSelfTestMode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
