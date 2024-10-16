import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetAudioControl(addr: number, bBroadcast: boolean, audioControl: number): Promise<void>;
    trySetAudioControl(addr: number, audioControl: number): Promise<ErrorType | null>;
  }
}
export default function createSetAudioControl<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  audioControl: number
): Request<Broadcast> {
  const $data = encodeUIntLE(audioControl, AddressMapping.AudioControlOccupancy);
  const req = new Request($data, bBroadcast, 'SetAudioControl');
  req.destination = addr;
  req.address = AddressMapping.AudioControlAddr;
  return req;
}
Session.prototype.SetAudioControl = async function SetAudioControl(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  audioControl: number
): Promise<void> {
  const req = createSetAudioControl(addr, bBroadcast, audioControl);
  await this.connection.send(req);
};
Session.prototype.trySetAudioControl = async function trySetAudioControl(
  this: Session,
  addr: number,
  audioControl: number
): Promise<ErrorType | null> {
  const req = createSetAudioControl(addr, false, audioControl);
  return (await this.connection.trySend(req))?.ack ?? null;
};
