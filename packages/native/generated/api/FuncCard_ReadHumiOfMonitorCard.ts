import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadHumiOfMonitorCard(addr: number): Promise<number>;
    tryFuncCard_ReadHumiOfMonitorCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadHumiOfMonitorCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_HumiOfMonitorCardOccupancy,
    'FuncCard_ReadHumiOfMonitorCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_HumiOfMonitorCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadHumiOfMonitorCard = async function FuncCard_ReadHumiOfMonitorCard(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadHumiOfMonitorCard(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadHumiOfMonitorCard =
  async function tryFuncCard_ReadHumiOfMonitorCard(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadHumiOfMonitorCard(addr);
    return this.connection.trySend(req);
  };
