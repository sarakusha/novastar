import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetReturnFactoryValues(
      addr: number,
      bBroadcast: boolean,
      returnFactoryValues: number
    ): Promise<void>;
    trySetReturnFactoryValues(addr: number, returnFactoryValues: number): Promise<ErrorType | null>;
  }
}
export default function createSetReturnFactoryValues<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  returnFactoryValues: number
): Request<Broadcast> {
  const $data = encodeUIntLE(returnFactoryValues, AddressMapping.SortOrderOccupancy);
  const req = new Request($data, bBroadcast, 'SetReturnFactoryValues');
  req.destination = addr;
  req.address = AddressMapping.ReturnFactoryValuesAddr;
  return req;
}
Session.prototype.SetReturnFactoryValues = async function SetReturnFactoryValues(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  returnFactoryValues: number
): Promise<void> {
  const req = createSetReturnFactoryValues(addr, bBroadcast, returnFactoryValues);
  await this.connection.send(req);
};
Session.prototype.trySetReturnFactoryValues = async function trySetReturnFactoryValues(
  this: Session,
  addr: number,
  returnFactoryValues: number
): Promise<ErrorType | null> {
  const req = createSetReturnFactoryValues(addr, false, returnFactoryValues);
  return (await this.connection.trySend(req))?.ack ?? null;
};
