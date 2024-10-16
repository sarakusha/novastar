import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetEndColScalePos(addr: number, bBroadcast: boolean, endColScalePos: number): Promise<void>;
    trySetEndColScalePos(addr: number, endColScalePos: number): Promise<ErrorType | null>;
  }
}
export default function createSetEndColScalePos<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  endColScalePos: number
): Request<Broadcast> {
  const $data = encodeUIntLE(endColScalePos, AddressMapping.ColScaleParAOccupancy);
  const req = new Request($data, bBroadcast, 'SetEndColScalePos');
  req.destination = addr;
  req.address = AddressMapping.EndColScalePosAddr;
  return req;
}
Session.prototype.SetEndColScalePos = async function SetEndColScalePos(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  endColScalePos: number
): Promise<void> {
  const req = createSetEndColScalePos(addr, bBroadcast, endColScalePos);
  await this.connection.send(req);
};
Session.prototype.trySetEndColScalePos = async function trySetEndColScalePos(
  this: Session,
  addr: number,
  endColScalePos: number
): Promise<ErrorType | null> {
  const req = createSetEndColScalePos(addr, false, endColScalePos);
  return (await this.connection.trySend(req))?.ack ?? null;
};
