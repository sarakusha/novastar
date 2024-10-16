import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDviSelect(addr: number, bBroadcast: boolean, dviSelect: number): Promise<void>;
    trySetDviSelect(addr: number, dviSelect: number): Promise<ErrorType | null>;
  }
}
export default function createSetDviSelect<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviSelect: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviSelect, AddressMapping.DviSelectOccupancy);
  const req = new Request($data, bBroadcast, 'SetDviSelect');
  req.destination = addr;
  req.address = AddressMapping.DviSelectAddr;
  return req;
}
Session.prototype.SetDviSelect = async function SetDviSelect(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviSelect: number
): Promise<void> {
  const req = createSetDviSelect(addr, bBroadcast, dviSelect);
  await this.connection.send(req);
};
Session.prototype.trySetDviSelect = async function trySetDviSelect(
  this: Session,
  addr: number,
  dviSelect: number
): Promise<ErrorType | null> {
  const req = createSetDviSelect(addr, false, dviSelect);
  return (await this.connection.trySend(req))?.ack ?? null;
};
