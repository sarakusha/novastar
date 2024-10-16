import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMasterOrSlave(
      addr: number,
      bBroadcast: boolean,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<void>;
    trySetMasterOrSlave(
      addr: number,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMasterOrSlave<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  masterOrSlaveBytes: number[] | Buffer
): Request<Broadcast> {
  if (masterOrSlaveBytes.length !== AddressMapping.MasterOrSlaveOccupancy)
    throw new TypeError(`Invalid buffer size: ${masterOrSlaveBytes.length}`);
  const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlave');
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveAddr;
  return req;
}
Session.prototype.SetMasterOrSlave = async function SetMasterOrSlave(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  masterOrSlaveBytes: number[] | Buffer
): Promise<void> {
  const req = createSetMasterOrSlave(addr, bBroadcast, masterOrSlaveBytes);
  await this.connection.send(req);
};
Session.prototype.trySetMasterOrSlave = async function trySetMasterOrSlave(
  this: Session,
  addr: number,
  masterOrSlaveBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetMasterOrSlave(addr, false, masterOrSlaveBytes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
