import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSenderABLParmsState(
      addr: number,
      bBroadcast: boolean,
      info: number[] | Buffer
    ): Promise<void>;
    trySetSenderABLParmsState(addr: number, info: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSenderABLParmsState<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  info: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(info, bBroadcast, 'SetSenderABLParmsState');
  req.destination = addr;
  req.address = AddressMapping.SenderABLtionAddr;
  return req;
}
Session.prototype.SetSenderABLParmsState = async function SetSenderABLParmsState(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  info: number[] | Buffer
): Promise<void> {
  const req = createSetSenderABLParmsState(addr, bBroadcast, info);
  await this.connection.send(req);
};
Session.prototype.trySetSenderABLParmsState = async function trySetSenderABLParmsState(
  this: Session,
  addr: number,
  info: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSenderABLParmsState(addr, false, info);
  return (await this.connection.trySend(req))?.ack ?? null;
};
