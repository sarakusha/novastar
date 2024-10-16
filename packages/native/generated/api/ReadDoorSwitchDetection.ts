import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDoorSwitchDetection(addr: number): Promise<number>;
    tryReadDoorSwitchDetection(addr: number): Promise<Packet | null>;
  }
}
export default function createReadDoorSwitchDetection(addr: number): Request {
  const req = new Request(AddressMapping.DoorSwitchDetectionOccupancy, 'ReadDoorSwitchDetection');
  req.destination = addr;
  req.address = AddressMapping.DoorSwitchDetectionAddr;
  return req;
}
Session.prototype.ReadDoorSwitchDetection = async function ReadDoorSwitchDetection(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadDoorSwitchDetection(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDoorSwitchDetection = async function tryReadDoorSwitchDetection(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadDoorSwitchDetection(addr);
  return this.connection.trySend(req);
};
