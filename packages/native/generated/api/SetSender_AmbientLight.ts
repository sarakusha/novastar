import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_AmbientLight(
      addr: number,
      bBroadcast: boolean,
      HDRAmbientLight: number
    ): Promise<void>;
    trySetSender_AmbientLight(addr: number, HDRAmbientLight: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_AmbientLight<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  HDRAmbientLight: number
): Request<Broadcast> {
  const req = new Request([HDRAmbientLight], bBroadcast, 'SetSender_AmbientLight');
  req.destination = addr;
  req.address = AddressMapping.HDRAmbientLightAddr;
  return req;
}
Session.prototype.SetSender_AmbientLight = async function SetSender_AmbientLight(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  HDRAmbientLight: number
): Promise<void> {
  const req = createSetSender_AmbientLight(addr, bBroadcast, HDRAmbientLight);
  await this.connection.send(req);
};
Session.prototype.trySetSender_AmbientLight = async function trySetSender_AmbientLight(
  this: Session,
  addr: number,
  HDRAmbientLight: number
): Promise<ErrorType | null> {
  const req = createSetSender_AmbientLight(addr, false, HDRAmbientLight);
  return (await this.connection.trySend(req))?.ack ?? null;
};
