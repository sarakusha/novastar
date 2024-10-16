import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_HDR10MinLum(addr: number, bBroadcast: boolean, HDR10MinLum: number): Promise<void>;
    trySetSender_HDR10MinLum(addr: number, HDR10MinLum: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HDR10MinLum<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  HDR10MinLum: number
): Request<Broadcast> {
  const req = new Request([HDR10MinLum], bBroadcast, 'SetSender_HDR10MinLum');
  req.destination = addr;
  req.address = AddressMapping.HDR10MinLum;
  return req;
}
Session.prototype.SetSender_HDR10MinLum = async function SetSender_HDR10MinLum(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  HDR10MinLum: number
): Promise<void> {
  const req = createSetSender_HDR10MinLum(addr, bBroadcast, HDR10MinLum);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HDR10MinLum = async function trySetSender_HDR10MinLum(
  this: Session,
  addr: number,
  HDR10MinLum: number
): Promise<ErrorType | null> {
  const req = createSetSender_HDR10MinLum(addr, false, HDR10MinLum);
  return (await this.connection.trySend(req))?.ack ?? null;
};
