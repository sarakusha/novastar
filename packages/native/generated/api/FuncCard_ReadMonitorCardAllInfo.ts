import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadMonitorCardAllInfo(addr: number): Promise<Buffer>;
    tryFuncCard_ReadMonitorCardAllInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadMonitorCardAllInfo(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MonitorCardAllInfoOccupancy,
    'FuncCard_ReadMonitorCardAllInfo'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MonitorCardAllInfoAddr;
  return req;
}
Session.prototype.FuncCard_ReadMonitorCardAllInfo = async function FuncCard_ReadMonitorCardAllInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadMonitorCardAllInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadMonitorCardAllInfo =
  async function tryFuncCard_ReadMonitorCardAllInfo(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadMonitorCardAllInfo(addr);
    return this.connection.trySend(req);
  };
