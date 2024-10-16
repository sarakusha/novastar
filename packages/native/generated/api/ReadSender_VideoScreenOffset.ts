import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoScreenOffset(addr: number): Promise<number>;
    tryReadSender_VideoScreenOffset(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoScreenOffset(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_VideoScreenOffsetOccupancy,
    'ReadSender_VideoScreenOffset'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoScreenOffsetAddr;
  return req;
}
Session.prototype.ReadSender_VideoScreenOffset = async function ReadSender_VideoScreenOffset(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_VideoScreenOffset(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_VideoScreenOffset = async function tryReadSender_VideoScreenOffset(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoScreenOffset(addr);
  return this.connection.trySend(req);
};
