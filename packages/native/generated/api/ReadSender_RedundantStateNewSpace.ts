import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_RedundantStateNewSpace(addr: number): Promise<Buffer>;
    tryReadSender_RedundantStateNewSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_RedundantStateNewSpace(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_RedundantStateSpaceOccupancy,
    'ReadSender_RedundantStateNewSpace'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_RedundantStateSpaceNewAddr;
  return req;
}
Session.prototype.ReadSender_RedundantStateNewSpace =
  async function ReadSender_RedundantStateNewSpace(this: Session, addr: number): Promise<Buffer> {
    const req = createReadSender_RedundantStateNewSpace(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadSender_RedundantStateNewSpace =
  async function tryReadSender_RedundantStateNewSpace(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_RedundantStateNewSpace(addr);
    return this.connection.trySend(req);
  };
