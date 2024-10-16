import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSenderScrenPeakLum(
      addr: number,
      bBroadcast: boolean,
      info: number[] | Buffer
    ): Promise<void>;
    trySetSenderScrenPeakLum(addr: number, info: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSenderScrenPeakLum<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  info: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(info, bBroadcast, 'SetSenderScrenPeakLum');
  req.destination = addr;
  req.address = AddressMapping.ScrenPeakLumAddr;
  return req;
}
Session.prototype.SetSenderScrenPeakLum = async function SetSenderScrenPeakLum(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  info: number[] | Buffer
): Promise<void> {
  const req = createSetSenderScrenPeakLum(addr, bBroadcast, info);
  await this.connection.send(req);
};
Session.prototype.trySetSenderScrenPeakLum = async function trySetSenderScrenPeakLum(
  this: Session,
  addr: number,
  info: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSenderScrenPeakLum(addr, false, info);
  return (await this.connection.trySend(req))?.ack ?? null;
};
