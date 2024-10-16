import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { OpticalWorkModeEnum } from '../OpticalWorkMode';

declare module '@novastar/codec' {
  interface API {
    SetSender_OpticalWorkMode(
      addr: number,
      bBroadcast: boolean,
      opticalWorkMode: OpticalWorkModeEnum
    ): Promise<void>;
    trySetSender_OpticalWorkMode(
      addr: number,
      opticalWorkMode: OpticalWorkModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_OpticalWorkMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  opticalWorkMode: OpticalWorkModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(opticalWorkMode, AddressMapping.OpticalWorkModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_OpticalWorkMode');
  req.destination = addr;
  req.address = AddressMapping.OpticalWorkModeAddr;
  return req;
}
Session.prototype.SetSender_OpticalWorkMode = async function SetSender_OpticalWorkMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  opticalWorkMode: OpticalWorkModeEnum
): Promise<void> {
  const req = createSetSender_OpticalWorkMode(addr, bBroadcast, opticalWorkMode);
  await this.connection.send(req);
};
Session.prototype.trySetSender_OpticalWorkMode = async function trySetSender_OpticalWorkMode(
  this: Session,
  addr: number,
  opticalWorkMode: OpticalWorkModeEnum
): Promise<ErrorType | null> {
  const req = createSetSender_OpticalWorkMode(addr, false, opticalWorkMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
