import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_GrayDepthAndBit(
      addr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_GrayDepthAndBit(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_GrayDepthAndBit<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_GrayDepthAndBitOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetSender_GrayDepthAndBit');
  req.destination = addr;
  req.address = AddressMapping.Sender_GrayDepthAndBitAddr;
  return req;
}
Session.prototype.SetSender_GrayDepthAndBit = async function SetSender_GrayDepthAndBit(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_GrayDepthAndBit(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_GrayDepthAndBit = async function trySetSender_GrayDepthAndBit(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_GrayDepthAndBit(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
