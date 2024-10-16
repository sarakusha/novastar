import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_RedundantStateSpace(addr: number): Promise<Buffer>;
    tryReadSender_RedundantStateSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_RedundantStateSpace(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_RedundantStateSpaceOccupancy,
    'ReadSender_RedundantStateSpace'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_RedundantStateSpaceAddr;
  return req;
}
Session.prototype.ReadSender_RedundantStateSpace = async function ReadSender_RedundantStateSpace(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_RedundantStateSpace(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_RedundantStateSpace =
  async function tryReadSender_RedundantStateSpace(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_RedundantStateSpace(addr);
    return this.connection.trySend(req);
  };
