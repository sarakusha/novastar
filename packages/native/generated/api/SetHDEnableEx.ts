import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetHDEnableEx(addr: number, bBroadcast: boolean, hdEnable: number): Promise<void>;
    trySetHDEnableEx(addr: number, hdEnable: number): Promise<ErrorType | null>;
  }
}
export default function createSetHDEnableEx<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  hdEnable: number
): Request<Broadcast> {
  const req = new Request([hdEnable], bBroadcast, 'SetHDEnableEx');
  req.destination = addr;
  req.address = AddressMapping.HDEnableAddr;
  return req;
}
Session.prototype.SetHDEnableEx = async function SetHDEnableEx(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  hdEnable: number
): Promise<void> {
  const req = createSetHDEnableEx(addr, bBroadcast, hdEnable);
  await this.connection.send(req);
};
Session.prototype.trySetHDEnableEx = async function trySetHDEnableEx(
  this: Session,
  addr: number,
  hdEnable: number
): Promise<ErrorType | null> {
  const req = createSetHDEnableEx(addr, false, hdEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
