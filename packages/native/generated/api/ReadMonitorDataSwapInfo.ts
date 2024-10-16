import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMonitorDataSwapInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadMonitorDataSwapInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadMonitorDataSwapInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadMonitorDataSwapInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MonitorGroupSwapInfoAndEnAddr;
  return req;
}
Session.prototype.ReadMonitorDataSwapInfo = async function ReadMonitorDataSwapInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadMonitorDataSwapInfo(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadMonitorDataSwapInfo = async function tryReadMonitorDataSwapInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadMonitorDataSwapInfo(addr, portAddr, scanBoardAddr, readLength);
  return this.connection.trySend(req);
};
