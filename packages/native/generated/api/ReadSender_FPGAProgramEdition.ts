import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_FPGAProgramEdition(addr: number): Promise<number>;
    tryReadSender_FPGAProgramEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_FPGAProgramEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_FPGAProgramEditionOccupancy,
    'ReadSender_FPGAProgramEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_FPGAProgramEditionAddr;
  return req;
}
Session.prototype.ReadSender_FPGAProgramEdition = async function ReadSender_FPGAProgramEdition(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_FPGAProgramEdition(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_FPGAProgramEdition =
  async function tryReadSender_FPGAProgramEdition(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_FPGAProgramEdition(addr);
    return this.connection.trySend(req);
  };
