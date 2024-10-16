import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadPowerPortCtrl_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      powerIndex: number
    ): Promise<number>;
    tryFuncCard_ReadPowerPortCtrl_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      powerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadPowerPortCtrl_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  powerIndex: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_PowerPortCtrlOccupancy,
    'FuncCard_ReadPowerPortCtrl_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address =
    AddressMapping.FuncCard_PowerPortCtrlAddr +
    powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
  return req;
}
Session.prototype.FuncCard_ReadPowerPortCtrl_1 = async function FuncCard_ReadPowerPortCtrl_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  powerIndex: number
): Promise<number> {
  const req = createFuncCard_ReadPowerPortCtrl_1(addr, portAddr, funcCardAddr, powerIndex);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadPowerPortCtrl_1 = async function tryFuncCard_ReadPowerPortCtrl_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  powerIndex: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadPowerPortCtrl_1(addr, portAddr, funcCardAddr, powerIndex);
  return this.connection.trySend(req);
};
