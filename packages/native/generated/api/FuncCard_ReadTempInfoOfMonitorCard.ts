import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadTempInfoOfMonitorCard(addr: number): Promise<number>;
    tryFuncCard_ReadTempInfoOfMonitorCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadTempInfoOfMonitorCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_TempInfoOfMonitorCardOccupancy,
    'FuncCard_ReadTempInfoOfMonitorCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_TempInfoOfMonitorCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadTempInfoOfMonitorCard =
  async function FuncCard_ReadTempInfoOfMonitorCard(this: Session, addr: number): Promise<number> {
    const req = createFuncCard_ReadTempInfoOfMonitorCard(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadTempInfoOfMonitorCard =
  async function tryFuncCard_ReadTempInfoOfMonitorCard(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadTempInfoOfMonitorCard(addr);
    return this.connection.trySend(req);
  };
