import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { PowerOperateTypeEnum } from '../PowerOperateType';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetPowerPortCtrlTotal(
      addr: number,
      bBroadcast: boolean,
      operType: PowerOperateTypeEnum
    ): Promise<void>;
    tryFuncCard_SetPowerPortCtrlTotal(
      addr: number,
      operType: PowerOperateTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetPowerPortCtrlTotal<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  operType: PowerOperateTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(operType, AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrlTotal');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
  return req;
}
Session.prototype.FuncCard_SetPowerPortCtrlTotal = async function FuncCard_SetPowerPortCtrlTotal(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  operType: PowerOperateTypeEnum
): Promise<void> {
  const req = createFuncCard_SetPowerPortCtrlTotal(addr, bBroadcast, operType);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetPowerPortCtrlTotal =
  async function tryFuncCard_SetPowerPortCtrlTotal(
    this: Session,
    addr: number,
    operType: PowerOperateTypeEnum
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetPowerPortCtrlTotal(addr, false, operType);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
