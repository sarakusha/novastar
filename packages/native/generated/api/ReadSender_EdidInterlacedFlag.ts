import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EdidInterlacedFlag(addr: number): Promise<number>;
    tryReadSender_EdidInterlacedFlag(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EdidInterlacedFlag(addr: number): Request {
  const req = new Request(
    AddressMapping.EdidInterlacedFlagOccupancy,
    'ReadSender_EdidInterlacedFlag'
  );
  req.destination = addr;
  req.address = AddressMapping.EdidInterlacedFlagAddr;
  return req;
}
Session.prototype.ReadSender_EdidInterlacedFlag = async function ReadSender_EdidInterlacedFlag(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_EdidInterlacedFlag(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_EdidInterlacedFlag =
  async function tryReadSender_EdidInterlacedFlag(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EdidInterlacedFlag(addr);
    return this.connection.trySend(req);
  };
