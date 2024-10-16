import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { PowerCtrlModeEnum } from '../PowerCtrlMode';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetPowerCtrlMode(
      addr: number,
      bBroadcast: boolean,
      powerCtrlMode: PowerCtrlModeEnum
    ): Promise<void>;
    tryFuncCard_SetPowerCtrlMode(
      addr: number,
      powerCtrlMode: PowerCtrlModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetPowerCtrlMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  powerCtrlMode: PowerCtrlModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerCtrlModeOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetPowerCtrlMode');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
  return req;
}
Session.prototype.FuncCard_SetPowerCtrlMode = async function FuncCard_SetPowerCtrlMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  powerCtrlMode: PowerCtrlModeEnum
): Promise<void> {
  const req = createFuncCard_SetPowerCtrlMode(addr, bBroadcast, powerCtrlMode);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetPowerCtrlMode = async function tryFuncCard_SetPowerCtrlMode(
  this: Session,
  addr: number,
  powerCtrlMode: PowerCtrlModeEnum
): Promise<ErrorType | null> {
  const req = createFuncCard_SetPowerCtrlMode(addr, false, powerCtrlMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
