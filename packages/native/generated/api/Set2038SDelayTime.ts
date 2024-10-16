import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set2038SDelayTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      delayTime: number
    ): Promise<void>;
    trySet2038SDelayTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      delayTime: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSet2038SDelayTime<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  delayTime: number
): Request<Broadcast> {
  const $data = encodeUIntLE(delayTime, AddressMapping.DelayTimeOccupancy);
  const req = new Request($data, bBroadcast, 'Set2038SDelayTime');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DelayTimeAddr;
  return req;
}
Session.prototype.Set2038SDelayTime = async function Set2038SDelayTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  delayTime: number
): Promise<void> {
  const req = createSet2038SDelayTime(addr, portAddr, scanBoardAddr, bBroadcast, delayTime);
  await this.connection.send(req);
};
Session.prototype.trySet2038SDelayTime = async function trySet2038SDelayTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  delayTime: number
): Promise<ErrorType | null> {
  const req = createSet2038SDelayTime(addr, portAddr, scanBoardAddr, false, delayTime);
  return (await this.connection.trySend(req))?.ack ?? null;
};
