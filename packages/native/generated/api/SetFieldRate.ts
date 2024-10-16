import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFieldRate(addr: number, bBroadcast: boolean, setFieldRate: number): Promise<void>;
    trySetFieldRate(addr: number, setFieldRate: number): Promise<ErrorType | null>;
  }
}
export default function createSetFieldRate<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  setFieldRate: number
): Request<Broadcast> {
  const $data = encodeUIntLE(setFieldRate, AddressMapping.SetFieldRateOccupancy);
  const req = new Request($data, bBroadcast, 'SetFieldRate');
  req.destination = addr;
  req.address = AddressMapping.SetFieldRateAddr;
  return req;
}
Session.prototype.SetFieldRate = async function SetFieldRate(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  setFieldRate: number
): Promise<void> {
  const req = createSetFieldRate(addr, bBroadcast, setFieldRate);
  await this.connection.send(req);
};
Session.prototype.trySetFieldRate = async function trySetFieldRate(
  this: Session,
  addr: number,
  setFieldRate: number
): Promise<ErrorType | null> {
  const req = createSetFieldRate(addr, false, setFieldRate);
  return (await this.connection.trySend(req))?.ack ?? null;
};
