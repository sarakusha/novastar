import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadAllPowerPortCtrl(addr: number): Promise<Buffer>;
    tryFuncCard_ReadAllPowerPortCtrl(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadAllPowerPortCtrl(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_PowerPortCtrlOccupancy * AddressMapping.FuncCard_PowerPortCtrlNum,
    'FuncCard_ReadAllPowerPortCtrl'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_PowerPortCtrlAddr;
  return req;
}
Session.prototype.FuncCard_ReadAllPowerPortCtrl = async function FuncCard_ReadAllPowerPortCtrl(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadAllPowerPortCtrl(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadAllPowerPortCtrl =
  async function tryFuncCard_ReadAllPowerPortCtrl(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadAllPowerPortCtrl(addr);
    return this.connection.trySend(req);
  };
