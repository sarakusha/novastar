import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadMonitorCardAllStatus(addr: number): Promise<Buffer>;
    tryFuncCard_ReadMonitorCardAllStatus(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadMonitorCardAllStatus(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MonitorCardAllStatusOccupancy,
    'FuncCard_ReadMonitorCardAllStatus'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MonitorCardAllStatusAddr;
  return req;
}
Session.prototype.FuncCard_ReadMonitorCardAllStatus =
  async function FuncCard_ReadMonitorCardAllStatus(this: Session, addr: number): Promise<Buffer> {
    const req = createFuncCard_ReadMonitorCardAllStatus(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadMonitorCardAllStatus =
  async function tryFuncCard_ReadMonitorCardAllStatus(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadMonitorCardAllStatus(addr);
    return this.connection.trySend(req);
  };
