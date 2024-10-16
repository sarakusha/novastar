import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetIsSerdes(addr: number, bBroadcast: boolean, IsSerdes: boolean): Promise<void>;
    trySetIsSerdes(addr: number, IsSerdes: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetIsSerdes<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  IsSerdes: boolean
): Request<Broadcast> {
  const req = new Request(IsSerdes ? [1] : [0], bBroadcast, 'SetIsSerdes');
  req.destination = addr;
  req.address = AddressMapping.SerdesEnableAddr;
  return req;
}
Session.prototype.SetIsSerdes = async function SetIsSerdes(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  IsSerdes: boolean
): Promise<void> {
  const req = createSetIsSerdes(addr, bBroadcast, IsSerdes);
  await this.connection.send(req);
};
Session.prototype.trySetIsSerdes = async function trySetIsSerdes(
  this: Session,
  addr: number,
  IsSerdes: boolean
): Promise<ErrorType | null> {
  const req = createSetIsSerdes(addr, false, IsSerdes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
