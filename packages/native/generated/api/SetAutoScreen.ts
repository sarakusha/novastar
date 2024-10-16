import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetAutoScreen(addr: number, bBroadcast: boolean, data: number[] | Buffer): Promise<void>;
    trySetAutoScreen(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetAutoScreen<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.AutoScreenSettingOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetAutoScreen');
  req.destination = addr;
  req.address = AddressMapping.AutoScreenSettingAddr;
  return req;
}
Session.prototype.SetAutoScreen = async function SetAutoScreen(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetAutoScreen(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetAutoScreen = async function trySetAutoScreen(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetAutoScreen(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
