import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_VideoWindowRect(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_VideoWindowRect(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_VideoWindowRect<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_VideoWindowRectOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBoradcast, 'SetSender_VideoWindowRect');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoWindowRectAddr;
  return req;
}
Session.prototype.SetSender_VideoWindowRect = async function SetSender_VideoWindowRect(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_VideoWindowRect(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_VideoWindowRect = async function trySetSender_VideoWindowRect(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_VideoWindowRect(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
