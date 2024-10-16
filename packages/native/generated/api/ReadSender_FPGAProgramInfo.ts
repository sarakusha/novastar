import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_FPGAProgramInfo(addr: number): Promise<Buffer>;
    tryReadSender_FPGAProgramInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_FPGAProgramInfo(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_FPGAProgramInfoOccupancy,
    'ReadSender_FPGAProgramInfo'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_FPGAProgramInfoAddr;
  return req;
}
Session.prototype.ReadSender_FPGAProgramInfo = async function ReadSender_FPGAProgramInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_FPGAProgramInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_FPGAProgramInfo = async function tryReadSender_FPGAProgramInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_FPGAProgramInfo(addr);
  return this.connection.trySend(req);
};
