import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMirrorMode(
      addr: number,
      bBroadcast: boolean,
      mirrorModeData: number,
      isPreposition: boolean
    ): Promise<void>;
    trySetMirrorMode(
      addr: number,
      mirrorModeData: number,
      isPreposition: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMirrorMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  mirrorModeData: number,
  isPreposition: boolean
): Request<Broadcast> {
  const req = new Request([mirrorModeData], bBroadcast, 'SetMirrorMode');
  req.destination = addr;
  if (isPreposition) {
    req.address = AddressMapping.MirrorModeFirAddr;
  } else {
    req.address = AddressMapping.MirrorModeSecAddr;
  }
  return req;
}
Session.prototype.SetMirrorMode = async function SetMirrorMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  mirrorModeData: number,
  isPreposition: boolean
): Promise<void> {
  const req = createSetMirrorMode(addr, bBroadcast, mirrorModeData, isPreposition);
  await this.connection.send(req);
};
Session.prototype.trySetMirrorMode = async function trySetMirrorMode(
  this: Session,
  addr: number,
  mirrorModeData: number,
  isPreposition: boolean
): Promise<ErrorType | null> {
  const req = createSetMirrorMode(addr, false, mirrorModeData, isPreposition);
  return (await this.connection.trySend(req))?.ack ?? null;
};
