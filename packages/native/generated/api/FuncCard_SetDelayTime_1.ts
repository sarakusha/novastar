import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetDelayTime_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      delayTime: number
    ): Promise<void>;
    tryFuncCard_SetDelayTime_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      delayTime: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetDelayTime_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  delayTime: number
): Request<Broadcast> {
  const $data = encodeUIntLE(delayTime, AddressMapping.FuncCard_DelayTimeOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetDelayTime_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_DelayTimeAddr;
  return req;
}
Session.prototype.FuncCard_SetDelayTime_1 = async function FuncCard_SetDelayTime_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: boolean,
  delayTime: number
): Promise<void> {
  const req = createFuncCard_SetDelayTime_1(addr, portAddr, funcCardAddr, bBroadcast, delayTime);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetDelayTime_1 = async function tryFuncCard_SetDelayTime_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  delayTime: number
): Promise<ErrorType | null> {
  const req = createFuncCard_SetDelayTime_1(addr, portAddr, funcCardAddr, false, delayTime);
  return (await this.connection.trySend(req))?.ack ?? null;
};
