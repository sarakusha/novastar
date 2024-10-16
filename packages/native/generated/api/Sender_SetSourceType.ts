import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { SourceSelectModeEnum } from '../SourceSelectMode';

declare module '@novastar/codec' {
  interface API {
    Sender_SetSourceType(
      addr: number,
      bBroadcast: boolean,
      sourceMode: SourceSelectModeEnum
    ): Promise<void>;
    trySender_SetSourceType(
      addr: number,
      sourceMode: SourceSelectModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSender_SetSourceType<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  sourceMode: SourceSelectModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(sourceMode, AddressMapping.AudioControlOccupancy);
  const req = new Request($data, bBroadcast, 'Sender_SetSourceType');
  req.destination = addr;
  req.address = AddressMapping.SetSourceTypeAddr;
  return req;
}
Session.prototype.Sender_SetSourceType = async function Sender_SetSourceType(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  sourceMode: SourceSelectModeEnum
): Promise<void> {
  const req = createSender_SetSourceType(addr, bBroadcast, sourceMode);
  await this.connection.send(req);
};
Session.prototype.trySender_SetSourceType = async function trySender_SetSourceType(
  this: Session,
  addr: number,
  sourceMode: SourceSelectModeEnum
): Promise<ErrorType | null> {
  const req = createSender_SetSourceType(addr, false, sourceMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
