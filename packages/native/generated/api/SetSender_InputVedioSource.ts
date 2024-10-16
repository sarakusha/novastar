import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_InputVedioSource(addr: number, bBoradcast: boolean, data: number): Promise<void>;
    trySetSender_InputVedioSource(addr: number, data: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_InputVedioSource<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBoradcast, 'SetSender_InputVedioSource');
  req.destination = addr;
  req.address = AddressMapping.Sender_InputVedioSourceAddr;
  return req;
}
Session.prototype.SetSender_InputVedioSource = async function SetSender_InputVedioSource(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number
): Promise<void> {
  const req = createSetSender_InputVedioSource(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_InputVedioSource = async function trySetSender_InputVedioSource(
  this: Session,
  addr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetSender_InputVedioSource(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
