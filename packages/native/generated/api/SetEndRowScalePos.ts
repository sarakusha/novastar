import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetEndRowScalePos(addr: number, bBroadcast: boolean, endRowScalePos: number): Promise<void>;
    trySetEndRowScalePos(addr: number, endRowScalePos: number): Promise<ErrorType | null>;
  }
}
export default function createSetEndRowScalePos<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  endRowScalePos: number
): Request<Broadcast> {
  const $data = encodeUIntLE(endRowScalePos, AddressMapping.EndRowScalePosOccupancy);
  const req = new Request($data, bBroadcast, 'SetEndRowScalePos');
  req.destination = addr;
  req.address = AddressMapping.EndRowScalePosAddr;
  return req;
}
Session.prototype.SetEndRowScalePos = async function SetEndRowScalePos(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  endRowScalePos: number
): Promise<void> {
  const req = createSetEndRowScalePos(addr, bBroadcast, endRowScalePos);
  await this.connection.send(req);
};
Session.prototype.trySetEndRowScalePos = async function trySetEndRowScalePos(
  this: Session,
  addr: number,
  endRowScalePos: number
): Promise<ErrorType | null> {
  const req = createSetEndRowScalePos(addr, false, endRowScalePos);
  return (await this.connection.trySend(req))?.ack ?? null;
};
