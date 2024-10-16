import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMasterOrSlaveNew16Addr(
      addr: number,
      bBroadcast: boolean,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<void>;
    trySetMasterOrSlaveNew16Addr(
      addr: number,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMasterOrSlaveNew16Addr<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  masterOrSlaveBytes: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlaveNew16Addr');
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveNew16Addr;
  return req;
}
Session.prototype.SetMasterOrSlaveNew16Addr = async function SetMasterOrSlaveNew16Addr(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  masterOrSlaveBytes: number[] | Buffer
): Promise<void> {
  const req = createSetMasterOrSlaveNew16Addr(addr, bBroadcast, masterOrSlaveBytes);
  await this.connection.send(req);
};
Session.prototype.trySetMasterOrSlaveNew16Addr = async function trySetMasterOrSlaveNew16Addr(
  this: Session,
  addr: number,
  masterOrSlaveBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetMasterOrSlaveNew16Addr(addr, false, masterOrSlaveBytes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
