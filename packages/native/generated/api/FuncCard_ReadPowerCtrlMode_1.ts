import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadPowerCtrlMode_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<number>;
    tryFuncCard_ReadPowerCtrlMode_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadPowerCtrlMode_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_PowerCtrlModeOccupancy,
    'FuncCard_ReadPowerCtrlMode_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
  return req;
}
Session.prototype.FuncCard_ReadPowerCtrlMode_1 = async function FuncCard_ReadPowerCtrlMode_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Promise<number> {
  const req = createFuncCard_ReadPowerCtrlMode_1(addr, portAddr, funcCardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadPowerCtrlMode_1 = async function tryFuncCard_ReadPowerCtrlMode_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadPowerCtrlMode_1(addr, portAddr, funcCardAddr);
  return this.connection.trySend(req);
};
