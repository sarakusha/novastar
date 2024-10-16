import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadMonitorCardAllInfo_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Buffer>;
    tryFuncCard_ReadMonitorCardAllInfo_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadMonitorCardAllInfo_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_MonitorCardAllInfoOccupancy,
    'FuncCard_ReadMonitorCardAllInfo_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_MonitorCardAllInfoAddr;
  return req;
}
Session.prototype.FuncCard_ReadMonitorCardAllInfo_1 =
  async function FuncCard_ReadMonitorCardAllInfo_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = createFuncCard_ReadMonitorCardAllInfo_1(addr, portAddr, funcCardAddr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadMonitorCardAllInfo_1 =
  async function tryFuncCard_ReadMonitorCardAllInfo_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadMonitorCardAllInfo_1(addr, portAddr, funcCardAddr);
    return this.connection.trySend(req);
  };
