import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadMonitorFPGAVersion(addr: number): Promise<number>;
    tryFuncCard_ReadMonitorFPGAVersion(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadMonitorFPGAVersion(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MonitorFPGAVersionOccupancy,
    'FuncCard_ReadMonitorFPGAVersion'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MonitorFPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_ReadMonitorFPGAVersion = async function FuncCard_ReadMonitorFPGAVersion(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadMonitorFPGAVersion(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadMonitorFPGAVersion =
  async function tryFuncCard_ReadMonitorFPGAVersion(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadMonitorFPGAVersion(addr);
    return this.connection.trySend(req);
  };
