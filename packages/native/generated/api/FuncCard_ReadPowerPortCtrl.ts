import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadPowerPortCtrl(addr: number, powerIndex: number): Promise<number>;
    tryFuncCard_ReadPowerPortCtrl(addr: number, powerIndex: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadPowerPortCtrl(
  addr: number,
  powerIndex: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_PowerPortCtrlOccupancy,
    'FuncCard_ReadPowerPortCtrl'
  );
  req.destination = addr;
  req.address =
    AddressMapping.FuncCard_PowerPortCtrlAddr +
    powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
  return req;
}
Session.prototype.FuncCard_ReadPowerPortCtrl = async function FuncCard_ReadPowerPortCtrl(
  this: Session,
  addr: number,
  powerIndex: number
): Promise<number> {
  const req = createFuncCard_ReadPowerPortCtrl(addr, powerIndex);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadPowerPortCtrl = async function tryFuncCard_ReadPowerPortCtrl(
  this: Session,
  addr: number,
  powerIndex: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadPowerPortCtrl(addr, powerIndex);
  return this.connection.trySend(req);
};
