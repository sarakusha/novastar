import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_WebProgramTailEdition(addr: number): Promise<number>;
    tryReadSender_WebProgramTailEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_WebProgramTailEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_WebProgramTailEditionOccupancy,
    'ReadSender_WebProgramTailEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_WebProgramTailEditAddr;
  return req;
}
Session.prototype.ReadSender_WebProgramTailEdition =
  async function ReadSender_WebProgramTailEdition(this: Session, addr: number): Promise<number> {
    const req = createReadSender_WebProgramTailEdition(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_WebProgramTailEdition =
  async function tryReadSender_WebProgramTailEdition(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_WebProgramTailEdition(addr);
    return this.connection.trySend(req);
  };
