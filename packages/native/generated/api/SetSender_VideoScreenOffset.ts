import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_VideoScreenOffset(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_VideoScreenOffset(
      addr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_VideoScreenOffset<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_VideoScreenOffsetOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBoradcast, 'SetSender_VideoScreenOffset');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoScreenOffsetAddr;
  return req;
}
Session.prototype.SetSender_VideoScreenOffset = async function SetSender_VideoScreenOffset(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_VideoScreenOffset(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_VideoScreenOffset = async function trySetSender_VideoScreenOffset(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_VideoScreenOffset(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
