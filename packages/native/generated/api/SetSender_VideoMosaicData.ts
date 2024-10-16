import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_VideoMosaicData(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_VideoMosaicData(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_VideoMosaicData<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_VideoMosaicOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBoradcast, 'SetSender_VideoMosaicData');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoMosaicAddr;
  return req;
}
Session.prototype.SetSender_VideoMosaicData = async function SetSender_VideoMosaicData(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_VideoMosaicData(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_VideoMosaicData = async function trySetSender_VideoMosaicData(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_VideoMosaicData(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
