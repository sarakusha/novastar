import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_WebProgramEdition(addr: number): Promise<number>;
    tryReadSender_WebProgramEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_WebProgramEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_WebProgramEditionOccupancy,
    'ReadSender_WebProgramEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_WebProgramEditAddr;
  return req;
}
Session.prototype.ReadSender_WebProgramEdition = async function ReadSender_WebProgramEdition(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_WebProgramEdition(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_WebProgramEdition = async function tryReadSender_WebProgramEdition(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_WebProgramEdition(addr);
  return this.connection.trySend(req);
};
