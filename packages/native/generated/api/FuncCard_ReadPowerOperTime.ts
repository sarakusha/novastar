import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadPowerOperTime(addr: number): Promise<Buffer>;
    tryFuncCard_ReadPowerOperTime(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadPowerOperTime(addr: number): Request {
  const req = new Request(AddressMapping.FuncCard_OperPowerOccupancy, 'FuncCard_ReadPowerOperTime');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_PowerOperTimeAddr;
  return req;
}
Session.prototype.FuncCard_ReadPowerOperTime = async function FuncCard_ReadPowerOperTime(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadPowerOperTime(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadPowerOperTime = async function tryFuncCard_ReadPowerOperTime(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadPowerOperTime(addr);
  return this.connection.trySend(req);
};
