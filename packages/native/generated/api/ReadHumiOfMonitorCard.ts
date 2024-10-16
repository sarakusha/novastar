import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHumiOfMonitorCard(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadHumiOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadHumiOfMonitorCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_HumiOfMonitorCardOccupancy,
    'ReadHumiOfMonitorCard'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_HumiOfMonitorCardAddr;
  return req;
}
Session.prototype.ReadHumiOfMonitorCard = async function ReadHumiOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadHumiOfMonitorCard(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadHumiOfMonitorCard = async function tryReadHumiOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadHumiOfMonitorCard(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
