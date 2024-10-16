import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHubMonitorStatus(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadHubMonitorStatus(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadHubMonitorStatus(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Scanner_HubMonitorDataOccupancy, 'ReadHubMonitorStatus');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_HubMonitorAllDataAddr;
  return req;
}
Session.prototype.ReadHubMonitorStatus = async function ReadHubMonitorStatus(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadHubMonitorStatus(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadHubMonitorStatus = async function tryReadHubMonitorStatus(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadHubMonitorStatus(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
