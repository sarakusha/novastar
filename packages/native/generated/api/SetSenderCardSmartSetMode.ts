import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSenderCardSmartSetMode(
      addr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSenderCardSmartSetMode(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSenderCardSmartSetMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetSenderCardSmartSetMode');
  req.destination = addr;
  req.address = AddressMapping.SenderCardSmartSetModeAddr;
  return req;
}
Session.prototype.SetSenderCardSmartSetMode = async function SetSenderCardSmartSetMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSenderCardSmartSetMode(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSenderCardSmartSetMode = async function trySetSenderCardSmartSetMode(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSenderCardSmartSetMode(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
