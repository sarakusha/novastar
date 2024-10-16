import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBackUpOrRestoreCmd(addr: number, bBroadcast: boolean, writeData: number): Promise<void>;
    trySetBackUpOrRestoreCmd(addr: number, writeData: number): Promise<ErrorType | null>;
  }
}
export default function createSetBackUpOrRestoreCmd<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  writeData: number
): Request<Broadcast> {
  const req = new Request([writeData], bBroadcast, 'SetBackUpOrRestoreCmd');
  req.destination = addr;
  req.address = AddressMapping.SetBackUpOrRestoreAddr;
  return req;
}
Session.prototype.SetBackUpOrRestoreCmd = async function SetBackUpOrRestoreCmd(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  writeData: number
): Promise<void> {
  const req = createSetBackUpOrRestoreCmd(addr, bBroadcast, writeData);
  await this.connection.send(req);
};
Session.prototype.trySetBackUpOrRestoreCmd = async function trySetBackUpOrRestoreCmd(
  this: Session,
  addr: number,
  writeData: number
): Promise<ErrorType | null> {
  const req = createSetBackUpOrRestoreCmd(addr, false, writeData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
