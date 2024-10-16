import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMasterOrSlaveState(addr: number): Promise<number>;
    tryReadMasterOrSlaveState(addr: number): Promise<Packet | null>;
  }
}
export default function createReadMasterOrSlaveState(addr: number): Request {
  const req = new Request(
    AddressMapping.MasterOrSlaveDeviceStateOccupancy,
    'ReadMasterOrSlaveState'
  );
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveDeviceStateAddr;
  return req;
}
Session.prototype.ReadMasterOrSlaveState = async function ReadMasterOrSlaveState(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadMasterOrSlaveState(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMasterOrSlaveState = async function tryReadMasterOrSlaveState(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadMasterOrSlaveState(addr);
  return this.connection.trySend(req);
};
