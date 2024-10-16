import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRestoreFinishFlag(addr: number, bBroadcast: boolean, writeData: number): Promise<void>;
    trySetRestoreFinishFlag(addr: number, writeData: number): Promise<ErrorType | null>;
  }
}
export default function createSetRestoreFinishFlag<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  writeData: number
): Request<Broadcast> {
  const req = new Request([writeData], bBroadcast, 'SetRestoreFinishFlag');
  req.destination = addr;
  req.address = AddressMapping.RestoreFinishFlagAddr;
  return req;
}
Session.prototype.SetRestoreFinishFlag = async function SetRestoreFinishFlag(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  writeData: number
): Promise<void> {
  const req = createSetRestoreFinishFlag(addr, bBroadcast, writeData);
  await this.connection.send(req);
};
Session.prototype.trySetRestoreFinishFlag = async function trySetRestoreFinishFlag(
  this: Session,
  addr: number,
  writeData: number
): Promise<ErrorType | null> {
  const req = createSetRestoreFinishFlag(addr, false, writeData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
