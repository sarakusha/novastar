import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadPowerPortCtrlTotal(addr: number): Promise<number>;
    tryFuncCard_ReadPowerPortCtrlTotal(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadPowerPortCtrlTotal(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy,
    'FuncCard_ReadPowerPortCtrlTotal'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
  return req;
}
Session.prototype.FuncCard_ReadPowerPortCtrlTotal = async function FuncCard_ReadPowerPortCtrlTotal(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadPowerPortCtrlTotal(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadPowerPortCtrlTotal =
  async function tryFuncCard_ReadPowerPortCtrlTotal(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadPowerPortCtrlTotal(addr);
    return this.connection.trySend(req);
  };
