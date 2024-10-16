import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { PowerCtrlModeEnum } from '../PowerCtrlMode';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetPowerCtrlMode_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      powerCtrlMode: PowerCtrlModeEnum
    ): Promise<void>;
    tryFuncCard_SetPowerCtrlMode_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      powerCtrlMode: PowerCtrlModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetPowerCtrlMode_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  powerCtrlMode: PowerCtrlModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerCtrlModeOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetPowerCtrlMode_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
  return req;
}
Session.prototype.FuncCard_SetPowerCtrlMode_1 = async function FuncCard_SetPowerCtrlMode_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: boolean,
  powerCtrlMode: PowerCtrlModeEnum
): Promise<void> {
  const req = createFuncCard_SetPowerCtrlMode_1(
    addr,
    portAddr,
    funcCardAddr,
    bBroadcast,
    powerCtrlMode
  );
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetPowerCtrlMode_1 = async function tryFuncCard_SetPowerCtrlMode_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  powerCtrlMode: PowerCtrlModeEnum
): Promise<ErrorType | null> {
  const req = createFuncCard_SetPowerCtrlMode_1(addr, portAddr, funcCardAddr, false, powerCtrlMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
