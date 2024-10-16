import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadMonitorCardModle(addr: number): Promise<number>;
    tryFuncCard_ReadMonitorCardModle(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadMonitorCardModle(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MonitorCardModleOccupancy,
    'FuncCard_ReadMonitorCardModle'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MonitorCardModleAddr;
  return req;
}
Session.prototype.FuncCard_ReadMonitorCardModle = async function FuncCard_ReadMonitorCardModle(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadMonitorCardModle(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadMonitorCardModle =
  async function tryFuncCard_ReadMonitorCardModle(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadMonitorCardModle(addr);
    return this.connection.trySend(req);
  };
