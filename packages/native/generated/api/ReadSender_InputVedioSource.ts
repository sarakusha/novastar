import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_InputVedioSource(addr: number): Promise<number>;
    tryReadSender_InputVedioSource(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_InputVedioSource(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_InputVedioSourceOccupancy,
    'ReadSender_InputVedioSource'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_InputVedioSourceAddr;
  return req;
}
Session.prototype.ReadSender_InputVedioSource = async function ReadSender_InputVedioSource(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_InputVedioSource(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_InputVedioSource = async function tryReadSender_InputVedioSource(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_InputVedioSource(addr);
  return this.connection.trySend(req);
};
