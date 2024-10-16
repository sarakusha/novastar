import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_DVIRows(addr: number, bBroadcast: boolean, dviRows: number): Promise<void>;
    trySetSender_DVIRows(addr: number, dviRows: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_DVIRows<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviRows: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviRows, AddressMapping.Sender_DVIRowsOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_DVIRows');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIRowsAddr;
  return req;
}
Session.prototype.SetSender_DVIRows = async function SetSender_DVIRows(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviRows: number
): Promise<void> {
  const req = createSetSender_DVIRows(addr, bBroadcast, dviRows);
  await this.connection.send(req);
};
Session.prototype.trySetSender_DVIRows = async function trySetSender_DVIRows(
  this: Session,
  addr: number,
  dviRows: number
): Promise<ErrorType | null> {
  const req = createSetSender_DVIRows(addr, false, dviRows);
  return (await this.connection.trySend(req))?.ack ?? null;
};
