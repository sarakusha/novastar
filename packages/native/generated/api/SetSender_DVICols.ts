import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_DVICols(addr: number, bBroadcast: boolean, dviCols: number): Promise<void>;
    trySetSender_DVICols(addr: number, dviCols: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_DVICols<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviCols: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviCols, AddressMapping.Sender_DVIColsOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_DVICols');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIColsAddr;
  return req;
}
Session.prototype.SetSender_DVICols = async function SetSender_DVICols(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviCols: number
): Promise<void> {
  const req = createSetSender_DVICols(addr, bBroadcast, dviCols);
  await this.connection.send(req);
};
Session.prototype.trySetSender_DVICols = async function trySetSender_DVICols(
  this: Session,
  addr: number,
  dviCols: number
): Promise<ErrorType | null> {
  const req = createSetSender_DVICols(addr, false, dviCols);
  return (await this.connection.trySend(req))?.ack ?? null;
};
