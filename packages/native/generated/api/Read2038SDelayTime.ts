import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read2038SDelayTime(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryRead2038SDelayTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createRead2038SDelayTime(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DelayTimeOccupancy, 'Read2038SDelayTime');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DelayTimeAddr;
  return req;
}
Session.prototype.Read2038SDelayTime = async function Read2038SDelayTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createRead2038SDelayTime(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryRead2038SDelayTime = async function tryRead2038SDelayTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createRead2038SDelayTime(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
