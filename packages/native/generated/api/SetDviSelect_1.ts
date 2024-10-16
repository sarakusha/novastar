import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { DviSelectModeEnum } from '../DviSelectMode';

declare module '@novastar/codec' {
  interface API {
    SetDviSelect_1(
      addr: number,
      bBroadcast: boolean,
      dviSelectMode: DviSelectModeEnum
    ): Promise<void>;
    trySetDviSelect_1(addr: number, dviSelectMode: DviSelectModeEnum): Promise<ErrorType | null>;
  }
}
export default function createSetDviSelect_1<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviSelectMode: DviSelectModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(dviSelectMode, AddressMapping.DviSelectOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviSelect_1');
  req.destination = addr;
  req.address = AddressMapping.DviSelectAddr;
  return req;
}
Session.prototype.SetDviSelect_1 = async function SetDviSelect_1(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviSelectMode: DviSelectModeEnum
): Promise<void> {
  const req = createSetDviSelect_1(addr, bBroadcast, dviSelectMode);
  await this.connection.send(req);
};
Session.prototype.trySetDviSelect_1 = async function trySetDviSelect_1(
  this: Session,
  addr: number,
  dviSelectMode: DviSelectModeEnum
): Promise<ErrorType | null> {
  const req = createSetDviSelect_1(addr, false, dviSelectMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
