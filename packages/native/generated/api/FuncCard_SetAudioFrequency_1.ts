import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { AudioFrequencyModeEnum } from '../AudioFrequencyMode';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetAudioFrequency_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      freMode: AudioFrequencyModeEnum
    ): Promise<void>;
    tryFuncCard_SetAudioFrequency_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      freMode: AudioFrequencyModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetAudioFrequency_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  freMode: AudioFrequencyModeEnum
): Request<Broadcast> {
  const req = new Request([freMode], bBroadcast, 'FuncCard_SetAudioFrequency_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
  return req;
}
Session.prototype.FuncCard_SetAudioFrequency_1 = async function FuncCard_SetAudioFrequency_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: boolean,
  freMode: AudioFrequencyModeEnum
): Promise<void> {
  const req = createFuncCard_SetAudioFrequency_1(addr, portAddr, funcCardAddr, bBroadcast, freMode);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetAudioFrequency_1 = async function tryFuncCard_SetAudioFrequency_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  freMode: AudioFrequencyModeEnum
): Promise<ErrorType | null> {
  const req = createFuncCard_SetAudioFrequency_1(addr, portAddr, funcCardAddr, false, freMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
