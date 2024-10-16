import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { HDEnableModeEnum } from '../HDEnableMode';

declare module '@novastar/codec' {
  interface API {
    SetHDEnable(addr: number, bBroadcast: boolean, hdEnable: HDEnableModeEnum): Promise<void>;
    trySetHDEnable(addr: number, hdEnable: HDEnableModeEnum): Promise<ErrorType | null>;
  }
}
export default function createSetHDEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  hdEnable: HDEnableModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(hdEnable, AddressMapping.HDEnableOccupancy);
  const req = new Request($data, bBroadcast, 'SetHDEnable');
  req.destination = addr;
  req.address = AddressMapping.HDEnableAddr;
  return req;
}
Session.prototype.SetHDEnable = async function SetHDEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  hdEnable: HDEnableModeEnum
): Promise<void> {
  const req = createSetHDEnable(addr, bBroadcast, hdEnable);
  await this.connection.send(req);
};
Session.prototype.trySetHDEnable = async function trySetHDEnable(
  this: Session,
  addr: number,
  hdEnable: HDEnableModeEnum
): Promise<ErrorType | null> {
  const req = createSetHDEnable(addr, false, hdEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
