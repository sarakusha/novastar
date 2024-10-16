import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadSmokeWarningOfMonitorCard(addr: number): Promise<number>;
    tryFuncCard_ReadSmokeWarningOfMonitorCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadSmokeWarningOfMonitorCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_SmokeWarningOfMonitorCardOccupancy,
    'FuncCard_ReadSmokeWarningOfMonitorCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_SmokeWarningOfMonitorCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadSmokeWarningOfMonitorCard =
  async function FuncCard_ReadSmokeWarningOfMonitorCard(
    this: Session,
    addr: number
  ): Promise<number> {
    const req = createFuncCard_ReadSmokeWarningOfMonitorCard(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadSmokeWarningOfMonitorCard =
  async function tryFuncCard_ReadSmokeWarningOfMonitorCard(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadSmokeWarningOfMonitorCard(addr);
    return this.connection.trySend(req);
  };
