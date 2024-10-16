import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetDelayTime(addr: number, bBroadcast: boolean, delayTime: number): Promise<void>;
    tryFuncCard_SetDelayTime(addr: number, delayTime: number): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetDelayTime<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  delayTime: number
): Request<Broadcast> {
  const $data = encodeUIntLE(delayTime, AddressMapping.FuncCard_DelayTimeOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetDelayTime');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_DelayTimeAddr;
  return req;
}
Session.prototype.FuncCard_SetDelayTime = async function FuncCard_SetDelayTime(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  delayTime: number
): Promise<void> {
  const req = createFuncCard_SetDelayTime(addr, bBroadcast, delayTime);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetDelayTime = async function tryFuncCard_SetDelayTime(
  this: Session,
  addr: number,
  delayTime: number
): Promise<ErrorType | null> {
  const req = createFuncCard_SetDelayTime(addr, false, delayTime);
  return (await this.connection.trySend(req))?.ack ?? null;
};
