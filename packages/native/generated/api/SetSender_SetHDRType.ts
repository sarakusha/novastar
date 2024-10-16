import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { HDRTypeEnum } from '../HDRType';

declare module '@novastar/codec' {
  interface API {
    SetSender_SetHDRType(addr: number, bBroadcast: boolean, hDRType: HDRTypeEnum): Promise<void>;
    trySetSender_SetHDRType(addr: number, hDRType: HDRTypeEnum): Promise<ErrorType | null>;
  }
}
export default function createSetSender_SetHDRType<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  hDRType: HDRTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(hDRType, AddressMapping.HDREnableInfoOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_SetHDRType');
  req.destination = addr;
  req.address = AddressMapping.HDRInfoAddr;
  return req;
}
Session.prototype.SetSender_SetHDRType = async function SetSender_SetHDRType(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  hDRType: HDRTypeEnum
): Promise<void> {
  const req = createSetSender_SetHDRType(addr, bBroadcast, hDRType);
  await this.connection.send(req);
};
Session.prototype.trySetSender_SetHDRType = async function trySetSender_SetHDRType(
  this: Session,
  addr: number,
  hDRType: HDRTypeEnum
): Promise<ErrorType | null> {
  const req = createSetSender_SetHDRType(addr, false, hDRType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
