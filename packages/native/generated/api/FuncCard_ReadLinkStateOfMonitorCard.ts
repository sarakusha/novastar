import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadLinkStateOfMonitorCard(addr: number): Promise<number>;
    tryFuncCard_ReadLinkStateOfMonitorCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadLinkStateOfMonitorCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_LinkStateOfMonitorCardOccupancy,
    'FuncCard_ReadLinkStateOfMonitorCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_LinkStateOfMonitorCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadLinkStateOfMonitorCard =
  async function FuncCard_ReadLinkStateOfMonitorCard(this: Session, addr: number): Promise<number> {
    const req = createFuncCard_ReadLinkStateOfMonitorCard(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadLinkStateOfMonitorCard =
  async function tryFuncCard_ReadLinkStateOfMonitorCard(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadLinkStateOfMonitorCard(addr);
    return this.connection.trySend(req);
  };
