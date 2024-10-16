import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { AudioControlModeEnum } from '../AudioControlMode';

declare module '@novastar/codec' {
  interface API {
    SetAudioControl_1(
      addr: number,
      bBroadcast: boolean,
      audioCtrlMode: AudioControlModeEnum
    ): Promise<void>;
    trySetAudioControl_1(
      addr: number,
      audioCtrlMode: AudioControlModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetAudioControl_1<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  audioCtrlMode: AudioControlModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(audioCtrlMode, AddressMapping.AudioControlOccupancy);
  const req = new Request($data, bBroadcast, 'SetAudioControl_1');
  req.destination = addr;
  req.address = AddressMapping.AudioControlAddr;
  return req;
}
Session.prototype.SetAudioControl_1 = async function SetAudioControl_1(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  audioCtrlMode: AudioControlModeEnum
): Promise<void> {
  const req = createSetAudioControl_1(addr, bBroadcast, audioCtrlMode);
  await this.connection.send(req);
};
Session.prototype.trySetAudioControl_1 = async function trySetAudioControl_1(
  this: Session,
  addr: number,
  audioCtrlMode: AudioControlModeEnum
): Promise<ErrorType | null> {
  const req = createSetAudioControl_1(addr, false, audioCtrlMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
