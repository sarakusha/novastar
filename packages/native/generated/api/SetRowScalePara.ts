import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRowScalePara(addr: number, bBroadcast: boolean, rowScalePar: number): Promise<void>;
    trySetRowScalePara(addr: number, rowScalePar: number): Promise<ErrorType | null>;
  }
}
export default function createSetRowScalePara<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  rowScalePar: number
): Request<Broadcast> {
  const $data = encodeUIntLE(rowScalePar, AddressMapping.ColScaleParAOccupancy);
  const req = new Request($data, bBroadcast, 'SetRowScalePara');
  req.destination = addr;
  req.address = AddressMapping.RowScaleParaAddr;
  return req;
}
Session.prototype.SetRowScalePara = async function SetRowScalePara(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  rowScalePar: number
): Promise<void> {
  const req = createSetRowScalePara(addr, bBroadcast, rowScalePar);
  await this.connection.send(req);
};
Session.prototype.trySetRowScalePara = async function trySetRowScalePara(
  this: Session,
  addr: number,
  rowScalePar: number
): Promise<ErrorType | null> {
  const req = createSetRowScalePara(addr, false, rowScalePar);
  return (await this.connection.trySend(req))?.ack ?? null;
};
