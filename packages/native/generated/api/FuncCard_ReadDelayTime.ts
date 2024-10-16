import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadDelayTime(addr: number): Promise<number>;
    tryFuncCard_ReadDelayTime(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadDelayTime(addr: number): Request {
  const req = new Request(AddressMapping.FuncCard_DelayTimeOccupancy, 'FuncCard_ReadDelayTime');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_DelayTimeAddr;
  return req;
}
Session.prototype.FuncCard_ReadDelayTime = async function FuncCard_ReadDelayTime(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadDelayTime(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadDelayTime = async function tryFuncCard_ReadDelayTime(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadDelayTime(addr);
  return this.connection.trySend(req);
};
