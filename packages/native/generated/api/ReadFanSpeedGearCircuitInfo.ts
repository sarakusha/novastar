import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadFanSpeedGearCircuitInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadFanSpeedGearCircuitInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadFanSpeedGearCircuitInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.FanSpeedGearOccupancy, 'ReadFanSpeedGearCircuitInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.FanSpeedGearAddr;
  return req;
}
Session.prototype.ReadFanSpeedGearCircuitInfo = async function ReadFanSpeedGearCircuitInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadFanSpeedGearCircuitInfo(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadFanSpeedGearCircuitInfo = async function tryReadFanSpeedGearCircuitInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadFanSpeedGearCircuitInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
