import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_DVIResolutionHeight(
      addr: number,
      bBroadcast: boolean,
      dviHeight: number
    ): Promise<void>;
    trySetSender_DVIResolutionHeight(addr: number, dviHeight: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_DVIResolutionHeight<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviHeight: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviHeight, AddressMapping.Sender_DVIWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_DVIResolutionHeight');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIHeightAddr;
  return req;
}
Session.prototype.SetSender_DVIResolutionHeight = async function SetSender_DVIResolutionHeight(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviHeight: number
): Promise<void> {
  const req = createSetSender_DVIResolutionHeight(addr, bBroadcast, dviHeight);
  await this.connection.send(req);
};
Session.prototype.trySetSender_DVIResolutionHeight =
  async function trySetSender_DVIResolutionHeight(
    this: Session,
    addr: number,
    dviHeight: number
  ): Promise<ErrorType | null> {
    const req = createSetSender_DVIResolutionHeight(addr, false, dviHeight);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
