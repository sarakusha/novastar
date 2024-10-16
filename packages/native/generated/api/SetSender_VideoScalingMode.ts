import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_VideoScalingMode(
      addr: number,
      bBoradcast: boolean,
      scalingMode: number
    ): Promise<void>;
    trySetSender_VideoScalingMode(addr: number, scalingMode: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_VideoScalingMode<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  scalingMode: number
): Request<Broadcast> {
  const req = new Request([scalingMode], bBoradcast, 'SetSender_VideoScalingMode');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoScalingModeAddr;
  return req;
}
Session.prototype.SetSender_VideoScalingMode = async function SetSender_VideoScalingMode(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  scalingMode: number
): Promise<void> {
  const req = createSetSender_VideoScalingMode(addr, bBoradcast, scalingMode);
  await this.connection.send(req);
};
Session.prototype.trySetSender_VideoScalingMode = async function trySetSender_VideoScalingMode(
  this: Session,
  addr: number,
  scalingMode: number
): Promise<ErrorType | null> {
  const req = createSetSender_VideoScalingMode(addr, false, scalingMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
