import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ImageProgramEdition(addr: number): Promise<number>;
    tryReadSender_ImageProgramEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ImageProgramEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_ImageProgramEditionOccupancy,
    'ReadSender_ImageProgramEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_ImageProgramEditionAddr;
  return req;
}
Session.prototype.ReadSender_ImageProgramEdition = async function ReadSender_ImageProgramEdition(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_ImageProgramEdition(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_ImageProgramEdition =
  async function tryReadSender_ImageProgramEdition(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_ImageProgramEdition(addr);
    return this.connection.trySend(req);
  };
