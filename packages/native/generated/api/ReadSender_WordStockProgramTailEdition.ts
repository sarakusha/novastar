import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_WordStockProgramTailEdition(addr: number): Promise<number>;
    tryReadSender_WordStockProgramTailEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_WordStockProgramTailEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_WordStockProgramTailEditionOccupancy,
    'ReadSender_WordStockProgramTailEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_WordStockProgramTailEditAddr;
  return req;
}
Session.prototype.ReadSender_WordStockProgramTailEdition =
  async function ReadSender_WordStockProgramTailEdition(
    this: Session,
    addr: number
  ): Promise<number> {
    const req = createReadSender_WordStockProgramTailEdition(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_WordStockProgramTailEdition =
  async function tryReadSender_WordStockProgramTailEdition(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_WordStockProgramTailEdition(addr);
    return this.connection.trySend(req);
  };
