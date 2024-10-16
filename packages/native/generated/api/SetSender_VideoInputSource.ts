import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_VideoInputSource(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_VideoInputSource(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_VideoInputSource<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_VideoInputSourceOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBoradcast, 'SetSender_VideoInputSource');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoInputSourceAddr;
  return req;
}
Session.prototype.SetSender_VideoInputSource = async function SetSender_VideoInputSource(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_VideoInputSource(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_VideoInputSource = async function trySetSender_VideoInputSource(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_VideoInputSource(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
