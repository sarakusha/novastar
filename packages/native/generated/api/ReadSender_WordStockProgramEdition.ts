import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_WordStockProgramEdition(addr: number): Promise<number>;
    tryReadSender_WordStockProgramEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_WordStockProgramEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_WordStockProgramEditionOccupancy,
    'ReadSender_WordStockProgramEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_WordStockProgramEditAddr;
  return req;
}
Session.prototype.ReadSender_WordStockProgramEdition =
  async function ReadSender_WordStockProgramEdition(this: Session, addr: number): Promise<number> {
    const req = createReadSender_WordStockProgramEdition(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_WordStockProgramEdition =
  async function tryReadSender_WordStockProgramEdition(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_WordStockProgramEdition(addr);
    return this.connection.trySend(req);
  };
