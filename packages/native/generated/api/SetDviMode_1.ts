import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { VedioSelectModeEnum } from '../VedioSelectMode';

declare module '@novastar/codec' {
  interface API {
    SetDviMode_1(addr: number, bBroadcast: boolean, dviMode: VedioSelectModeEnum): Promise<void>;
    trySetDviMode_1(addr: number, dviMode: VedioSelectModeEnum): Promise<ErrorType | null>;
  }
}
export default function createSetDviMode_1<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviMode: VedioSelectModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(
    dviMode !== VedioSelectModeEnum.Manual ? 255 : 90,
    AddressMapping.DviModeOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetDviMode_1');
  req.destination = addr;
  req.address = AddressMapping.DviModeAddr;
  return req;
}
Session.prototype.SetDviMode_1 = async function SetDviMode_1(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviMode: VedioSelectModeEnum
): Promise<void> {
  const req = createSetDviMode_1(addr, bBroadcast, dviMode);
  await this.connection.send(req);
};
Session.prototype.trySetDviMode_1 = async function trySetDviMode_1(
  this: Session,
  addr: number,
  dviMode: VedioSelectModeEnum
): Promise<ErrorType | null> {
  const req = createSetDviMode_1(addr, false, dviMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
