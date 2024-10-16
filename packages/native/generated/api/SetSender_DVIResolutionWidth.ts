import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_DVIResolutionWidth(
      addr: number,
      bBroadcast: boolean,
      dviWidth: number
    ): Promise<void>;
    trySetSender_DVIResolutionWidth(addr: number, dviWidth: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_DVIResolutionWidth<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviWidth: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviWidth, AddressMapping.Sender_DVIWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_DVIResolutionWidth');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIWidthAddr;
  return req;
}
Session.prototype.SetSender_DVIResolutionWidth = async function SetSender_DVIResolutionWidth(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviWidth: number
): Promise<void> {
  const req = createSetSender_DVIResolutionWidth(addr, bBroadcast, dviWidth);
  await this.connection.send(req);
};
Session.prototype.trySetSender_DVIResolutionWidth = async function trySetSender_DVIResolutionWidth(
  this: Session,
  addr: number,
  dviWidth: number
): Promise<ErrorType | null> {
  const req = createSetSender_DVIResolutionWidth(addr, false, dviWidth);
  return (await this.connection.trySend(req))?.ack ?? null;
};
