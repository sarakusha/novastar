import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { PowerOperateTypeEnum } from '../PowerOperateType';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetPowerPortCtrl_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      powerCtrlMode: PowerOperateTypeEnum,
      powerIndex: number
    ): Promise<void>;
    tryFuncCard_SetPowerPortCtrl_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      powerCtrlMode: PowerOperateTypeEnum,
      powerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetPowerPortCtrl_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  powerCtrlMode: PowerOperateTypeEnum,
  powerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerPortCtrlOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrl_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address =
    AddressMapping.FuncCard_PowerPortCtrlAddr +
    powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
  return req;
}
Session.prototype.FuncCard_SetPowerPortCtrl_1 = async function FuncCard_SetPowerPortCtrl_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: boolean,
  powerCtrlMode: PowerOperateTypeEnum,
  powerIndex: number
): Promise<void> {
  const req = createFuncCard_SetPowerPortCtrl_1(
    addr,
    portAddr,
    funcCardAddr,
    bBroadcast,
    powerCtrlMode,
    powerIndex
  );
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetPowerPortCtrl_1 = async function tryFuncCard_SetPowerPortCtrl_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  powerCtrlMode: PowerOperateTypeEnum,
  powerIndex: number
): Promise<ErrorType | null> {
  const req = createFuncCard_SetPowerPortCtrl_1(
    addr,
    portAddr,
    funcCardAddr,
    false,
    powerCtrlMode,
    powerIndex
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
