import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTempInfoOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadTempInfoOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTempInfoOfMonitorCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_TempInfoOfMonitorCardOccupancy,
    'ReadTempInfoOfMonitorCard'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_TempInfoOfMonitorCardAddr;
  return req;
}
Session.prototype.ReadTempInfoOfMonitorCard = async function ReadTempInfoOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTempInfoOfMonitorCard(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTempInfoOfMonitorCard = async function tryReadTempInfoOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTempInfoOfMonitorCard(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
