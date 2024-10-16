import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { PowerOperateTypeEnum } from '../PowerOperateType';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetPowerPortCtrlTotal_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      operType: PowerOperateTypeEnum
    ): Promise<void>;
    tryFuncCard_SetPowerPortCtrlTotal_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      operType: PowerOperateTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetPowerPortCtrlTotal_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  operType: PowerOperateTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(operType, AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrlTotal_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
  return req;
}
Session.prototype.FuncCard_SetPowerPortCtrlTotal_1 =
  async function FuncCard_SetPowerPortCtrlTotal_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    operType: PowerOperateTypeEnum
  ): Promise<void> {
    const req = createFuncCard_SetPowerPortCtrlTotal_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      operType
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetPowerPortCtrlTotal_1 =
  async function tryFuncCard_SetPowerPortCtrlTotal_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    operType: PowerOperateTypeEnum
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetPowerPortCtrlTotal_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      operType
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
