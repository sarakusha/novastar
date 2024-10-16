import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_AuthorizePassward(
      addr: number,
      bBroadcast: boolean,
      Passward: number[] | Buffer
    ): Promise<void>;
    trySetSender_AuthorizePassward(
      addr: number,
      Passward: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_AuthorizePassward<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  Passward: number[] | Buffer
): Request<Broadcast> {
  if (Passward.length !== AddressMapping.Sender_AuthorizePasswardOccupancy)
    throw new TypeError(`Invalid buffer size: ${Passward.length}`);
  const req = new Request(Passward, bBroadcast, 'SetSender_AuthorizePassward');
  req.destination = addr;
  req.address = AddressMapping.Sender_AuthorizePasswardAddr;
  return req;
}
Session.prototype.SetSender_AuthorizePassward = async function SetSender_AuthorizePassward(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  Passward: number[] | Buffer
): Promise<void> {
  const req = createSetSender_AuthorizePassward(addr, bBroadcast, Passward);
  await this.connection.send(req);
};
Session.prototype.trySetSender_AuthorizePassward = async function trySetSender_AuthorizePassward(
  this: Session,
  addr: number,
  Passward: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_AuthorizePassward(addr, false, Passward);
  return (await this.connection.trySend(req))?.ack ?? null;
};
