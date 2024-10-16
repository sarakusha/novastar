import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMasterOrSlaveNew32Addr(
      addr: number,
      bBroadcast: boolean,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<void>;
    trySetMasterOrSlaveNew32Addr(
      addr: number,
      masterOrSlaveBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMasterOrSlaveNew32Addr<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  masterOrSlaveBytes: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlaveNew32Addr');
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveNew32Addr;
  return req;
}
Session.prototype.SetMasterOrSlaveNew32Addr = async function SetMasterOrSlaveNew32Addr(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  masterOrSlaveBytes: number[] | Buffer
): Promise<void> {
  const req = createSetMasterOrSlaveNew32Addr(addr, bBroadcast, masterOrSlaveBytes);
  await this.connection.send(req);
};
Session.prototype.trySetMasterOrSlaveNew32Addr = async function trySetMasterOrSlaveNew32Addr(
  this: Session,
  addr: number,
  masterOrSlaveBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetMasterOrSlaveNew32Addr(addr, false, masterOrSlaveBytes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
