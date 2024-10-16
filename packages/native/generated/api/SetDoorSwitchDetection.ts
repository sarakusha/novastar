import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDoorSwitchDetection(addr: number, bBroadcast: boolean, data: number): Promise<void>;
    trySetDoorSwitchDetection(addr: number, data: number): Promise<ErrorType | null>;
  }
}
export default function createSetDoorSwitchDetection<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const $data = encodeUIntLE(data, AddressMapping.IsDoorSwitchDetectionOccupancy);
  const req = new Request($data, bBroadcast, 'SetDoorSwitchDetection');
  req.destination = addr;
  req.address = AddressMapping.IsDoorSwitchDetectionAddr;
  return req;
}
Session.prototype.SetDoorSwitchDetection = async function SetDoorSwitchDetection(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetDoorSwitchDetection(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetDoorSwitchDetection = async function trySetDoorSwitchDetection(
  this: Session,
  addr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetDoorSwitchDetection(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
