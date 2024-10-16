import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGclkUnitCycle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      gclkUnitCycle: number
    ): Promise<void>;
    trySetGclkUnitCycle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      gclkUnitCycle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGclkUnitCycle<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  gclkUnitCycle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(gclkUnitCycle, AddressMapping.GclkUnitCycleOccupancy);
  const req = new Request($data, bBroadcast, 'SetGclkUnitCycle');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkUnitCycleAddr;
  return req;
}
Session.prototype.SetGclkUnitCycle = async function SetGclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  gclkUnitCycle: number
): Promise<void> {
  const req = createSetGclkUnitCycle(addr, portAddr, scanBoardAddr, bBroadcast, gclkUnitCycle);
  await this.connection.send(req);
};
Session.prototype.trySetGclkUnitCycle = async function trySetGclkUnitCycle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  gclkUnitCycle: number
): Promise<ErrorType | null> {
  const req = createSetGclkUnitCycle(addr, portAddr, scanBoardAddr, false, gclkUnitCycle);
  return (await this.connection.trySend(req))?.ack ?? null;
};
