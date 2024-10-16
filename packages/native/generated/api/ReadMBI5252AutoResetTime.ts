import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMBI5252AutoResetTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadMBI5252AutoResetTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMBI5252AutoResetTime(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.MBI5252SetAutoResetTimeOccupancy,
    'ReadMBI5252AutoResetTime'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MBI5252SetAutoResetTimeAddr;
  return req;
}
Session.prototype.ReadMBI5252AutoResetTime = async function ReadMBI5252AutoResetTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadMBI5252AutoResetTime(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadMBI5252AutoResetTime = async function tryReadMBI5252AutoResetTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadMBI5252AutoResetTime(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
