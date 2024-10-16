import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_AuthorizeTime(
      addr: number,
      bBroadcast: boolean,
      authorizeTimeBytes: number[] | Buffer
    ): Promise<void>;
    trySetSender_AuthorizeTime(
      addr: number,
      authorizeTimeBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_AuthorizeTime<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  authorizeTimeBytes: number[] | Buffer
): Request<Broadcast> {
  if (authorizeTimeBytes.length !== AddressMapping.Sender_AuthorizeTimeOccupancy)
    throw new TypeError(`Invalid buffer size: ${authorizeTimeBytes.length}`);
  const req = new Request(authorizeTimeBytes, bBroadcast, 'SetSender_AuthorizeTime');
  req.destination = addr;
  req.address = AddressMapping.Sender_AuthorizeTimeAddr;
  return req;
}
Session.prototype.SetSender_AuthorizeTime = async function SetSender_AuthorizeTime(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  authorizeTimeBytes: number[] | Buffer
): Promise<void> {
  const req = createSetSender_AuthorizeTime(addr, bBroadcast, authorizeTimeBytes);
  await this.connection.send(req);
};
Session.prototype.trySetSender_AuthorizeTime = async function trySetSender_AuthorizeTime(
  this: Session,
  addr: number,
  authorizeTimeBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_AuthorizeTime(addr, false, authorizeTimeBytes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
