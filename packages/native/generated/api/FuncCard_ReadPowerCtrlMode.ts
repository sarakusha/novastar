import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadPowerCtrlMode(addr: number): Promise<number>;
    tryFuncCard_ReadPowerCtrlMode(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadPowerCtrlMode(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_PowerCtrlModeOccupancy,
    'FuncCard_ReadPowerCtrlMode'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
  return req;
}
Session.prototype.FuncCard_ReadPowerCtrlMode = async function FuncCard_ReadPowerCtrlMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadPowerCtrlMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadPowerCtrlMode = async function tryFuncCard_ReadPowerCtrlMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadPowerCtrlMode(addr);
  return this.connection.trySend(req);
};
