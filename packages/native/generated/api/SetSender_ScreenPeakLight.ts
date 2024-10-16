import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ScreenPeakLight(
      addr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_ScreenPeakLight(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ScreenPeakLight<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.HDRScreenPeakLightOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetSender_ScreenPeakLight');
  req.destination = addr;
  req.address = AddressMapping.HDRScreenPeakLightAddr;
  return req;
}
Session.prototype.SetSender_ScreenPeakLight = async function SetSender_ScreenPeakLight(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_ScreenPeakLight(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_ScreenPeakLight = async function trySetSender_ScreenPeakLight(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_ScreenPeakLight(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
