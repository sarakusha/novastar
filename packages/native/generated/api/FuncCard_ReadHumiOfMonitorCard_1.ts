import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadHumiOfMonitorCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<number>;
    tryFuncCard_ReadHumiOfMonitorCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadHumiOfMonitorCard_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_HumiOfMonitorCardOccupancy,
    'FuncCard_ReadHumiOfMonitorCard_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_HumiOfMonitorCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadHumiOfMonitorCard_1 =
  async function FuncCard_ReadHumiOfMonitorCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = createFuncCard_ReadHumiOfMonitorCard_1(addr, portAddr, funcCardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadHumiOfMonitorCard_1 =
  async function tryFuncCard_ReadHumiOfMonitorCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadHumiOfMonitorCard_1(addr, portAddr, funcCardAddr);
    return this.connection.trySend(req);
  };
