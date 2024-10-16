import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { LowDelayModeEnum } from '../LowDelayMode';

declare module '@novastar/codec' {
  interface API {
    SetLowDelayMode(
      addr: number,
      bBroadcast: boolean,
      lowDelayMode: LowDelayModeEnum
    ): Promise<void>;
    trySetLowDelayMode(addr: number, lowDelayMode: LowDelayModeEnum): Promise<ErrorType | null>;
  }
}
export default function createSetLowDelayMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  lowDelayMode: LowDelayModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(lowDelayMode, AddressMapping.LoadModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetLowDelayMode');
  req.destination = addr;
  req.address = AddressMapping.LowDelayAddr;
  return req;
}
Session.prototype.SetLowDelayMode = async function SetLowDelayMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  lowDelayMode: LowDelayModeEnum
): Promise<void> {
  const req = createSetLowDelayMode(addr, bBroadcast, lowDelayMode);
  await this.connection.send(req);
};
Session.prototype.trySetLowDelayMode = async function trySetLowDelayMode(
  this: Session,
  addr: number,
  lowDelayMode: LowDelayModeEnum
): Promise<ErrorType | null> {
  const req = createSetLowDelayMode(addr, false, lowDelayMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
