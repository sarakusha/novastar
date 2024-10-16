import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { PowerOperateTypeEnum } from '../PowerOperateType';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetPowerPortCtrl(
      addr: number,
      bBroadcast: boolean,
      powerCtrlMode: PowerOperateTypeEnum,
      powerIndex: number
    ): Promise<void>;
    tryFuncCard_SetPowerPortCtrl(
      addr: number,
      powerCtrlMode: PowerOperateTypeEnum,
      powerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetPowerPortCtrl<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  powerCtrlMode: PowerOperateTypeEnum,
  powerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerPortCtrlOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrl');
  req.destination = addr;
  req.address =
    AddressMapping.FuncCard_PowerPortCtrlAddr +
    powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
  return req;
}
Session.prototype.FuncCard_SetPowerPortCtrl = async function FuncCard_SetPowerPortCtrl(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  powerCtrlMode: PowerOperateTypeEnum,
  powerIndex: number
): Promise<void> {
  const req = createFuncCard_SetPowerPortCtrl(addr, bBroadcast, powerCtrlMode, powerIndex);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetPowerPortCtrl = async function tryFuncCard_SetPowerPortCtrl(
  this: Session,
  addr: number,
  powerCtrlMode: PowerOperateTypeEnum,
  powerIndex: number
): Promise<ErrorType | null> {
  const req = createFuncCard_SetPowerPortCtrl(addr, false, powerCtrlMode, powerIndex);
  return (await this.connection.trySend(req))?.ack ?? null;
};
