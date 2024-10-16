import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDclkUnitCycle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dclkUnitCycle: number
    ): Promise<void>;
    trySetDclkUnitCycle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dclkUnitCycle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDclkUnitCycle<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dclkUnitCycle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dclkUnitCycle, AddressMapping.DclkUnitCycleOccupancy);
  const req = new Request($data, bBroadcast, 'SetDclkUnitCycle');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkUnitCycleAddr;
  return req;
}
Session.prototype.SetDclkUnitCycle = async function SetDclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dclkUnitCycle: number
): Promise<void> {
  const req = createSetDclkUnitCycle(addr, portAddr, scanBoardAddr, bBroadcast, dclkUnitCycle);
  await this.connection.send(req);
};
Session.prototype.trySetDclkUnitCycle = async function trySetDclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dclkUnitCycle: number
): Promise<ErrorType | null> {
  const req = createSetDclkUnitCycle(addr, portAddr, scanBoardAddr, false, dclkUnitCycle);
  return (await this.connection.trySend(req))?.ack ?? null;
};
