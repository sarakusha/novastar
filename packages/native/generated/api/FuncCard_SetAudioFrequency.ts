import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { AudioFrequencyModeEnum } from '../AudioFrequencyMode';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetAudioFrequency(
      addr: number,
      bBroadcast: boolean,
      freMode: AudioFrequencyModeEnum
    ): Promise<void>;
    tryFuncCard_SetAudioFrequency(
      addr: number,
      freMode: AudioFrequencyModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetAudioFrequency<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  freMode: AudioFrequencyModeEnum
): Request<Broadcast> {
  const req = new Request([freMode], bBroadcast, 'FuncCard_SetAudioFrequency');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
  return req;
}
Session.prototype.FuncCard_SetAudioFrequency = async function FuncCard_SetAudioFrequency(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  freMode: AudioFrequencyModeEnum
): Promise<void> {
  const req = createFuncCard_SetAudioFrequency(addr, bBroadcast, freMode);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetAudioFrequency = async function tryFuncCard_SetAudioFrequency(
  this: Session,
  addr: number,
  freMode: AudioFrequencyModeEnum
): Promise<ErrorType | null> {
  const req = createFuncCard_SetAudioFrequency(addr, false, freMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
