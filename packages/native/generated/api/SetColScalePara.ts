import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetColScalePara(addr: number, bBroadcast: boolean, colScalePar: number): Promise<void>;
    trySetColScalePara(addr: number, colScalePar: number): Promise<ErrorType | null>;
  }
}
export default function createSetColScalePara<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  colScalePar: number
): Request<Broadcast> {
  const $data = encodeUIntLE(colScalePar, AddressMapping.ColScaleParAOccupancy);
  const req = new Request($data, bBroadcast, 'SetColScalePara');
  req.destination = addr;
  req.address = AddressMapping.ColScaleParaAddr;
  return req;
}
Session.prototype.SetColScalePara = async function SetColScalePara(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  colScalePar: number
): Promise<void> {
  const req = createSetColScalePara(addr, bBroadcast, colScalePar);
  await this.connection.send(req);
};
Session.prototype.trySetColScalePara = async function trySetColScalePara(
  this: Session,
  addr: number,
  colScalePar: number
): Promise<ErrorType | null> {
  const req = createSetColScalePara(addr, false, colScalePar);
  return (await this.connection.trySend(req))?.ack ?? null;
};
