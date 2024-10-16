import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMasterOrSlaveNext(
      addr: number,
      bBroadcast: boolean,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<void>;
    trySetMasterOrSlaveNext(
      addr: number,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMasterOrSlaveNext<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  masterOrSlaveBytes: number[] | Buffer
): Request<Broadcast> {
  if (masterOrSlaveBytes.length !== AddressMapping.MasterOrSlaveOccupancy)
    throw new TypeError(`Invalid buffer size: ${masterOrSlaveBytes.length}`);
  const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlaveNext');
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveNewAddr;
  return req;
}
Session.prototype.SetMasterOrSlaveNext = async function SetMasterOrSlaveNext(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  masterOrSlaveBytes: number[] | Buffer
): Promise<void> {
  const req = createSetMasterOrSlaveNext(addr, bBroadcast, masterOrSlaveBytes);
  await this.connection.send(req);
};
Session.prototype.trySetMasterOrSlaveNext = async function trySetMasterOrSlaveNext(
  this: Session,
  addr: number,
  masterOrSlaveBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetMasterOrSlaveNext(addr, false, masterOrSlaveBytes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
