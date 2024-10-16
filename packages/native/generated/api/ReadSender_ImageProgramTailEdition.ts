import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ImageProgramTailEdition(addr: number): Promise<number>;
    tryReadSender_ImageProgramTailEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ImageProgramTailEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_ImageProgramTailEditionOccupancy,
    'ReadSender_ImageProgramTailEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_ImageProgramTailEditAddr;
  return req;
}
Session.prototype.ReadSender_ImageProgramTailEdition =
  async function ReadSender_ImageProgramTailEdition(this: Session, addr: number): Promise<number> {
    const req = createReadSender_ImageProgramTailEdition(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_ImageProgramTailEdition =
  async function tryReadSender_ImageProgramTailEdition(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_ImageProgramTailEdition(addr);
    return this.connection.trySend(req);
  };
