import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_Reset_1(addr: number, bBroadcast: boolean): Promise<void>;
    trySetSender_Reset_1(addr: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_Reset_1<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const req = new Request(Buffer.alloc(1), bBroadcast, 'SetSender_Reset_1');
  req.destination = addr;
  req.port = 255;
  req.rcvIndex = 65535;
  req.address = AddressMapping.Sender_McuResetAddr;
  return req;
}
Session.prototype.SetSender_Reset_1 = async function SetSender_Reset_1(
  this: Session,
  addr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createSetSender_Reset_1(addr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.trySetSender_Reset_1 = async function trySetSender_Reset_1(
  this: Session,
  addr: number
): Promise<ErrorType | null> {
  const req = createSetSender_Reset_1(addr, false);
  return (await this.connection.trySend(req))?.ack ?? null;
};
