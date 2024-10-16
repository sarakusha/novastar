import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadMonitorFPGAVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<number>;
    tryFuncCard_ReadMonitorFPGAVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadMonitorFPGAVersion_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_MonitorFPGAVersionOccupancy,
    'FuncCard_ReadMonitorFPGAVersion_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_MonitorFPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_ReadMonitorFPGAVersion_1 =
  async function FuncCard_ReadMonitorFPGAVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = createFuncCard_ReadMonitorFPGAVersion_1(addr, portAddr, funcCardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadMonitorFPGAVersion_1 =
  async function tryFuncCard_ReadMonitorFPGAVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadMonitorFPGAVersion_1(addr, portAddr, funcCardAddr);
    return this.connection.trySend(req);
  };
