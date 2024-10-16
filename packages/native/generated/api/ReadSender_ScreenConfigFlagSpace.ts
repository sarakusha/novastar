import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ScreenConfigFlagSpace(addr: number): Promise<number>;
    tryReadSender_ScreenConfigFlagSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ScreenConfigFlagSpace(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_ScreenConfigFlagOccupancy,
    'ReadSender_ScreenConfigFlagSpace'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_ScreenConfigFlagAddr;
  return req;
}
Session.prototype.ReadSender_ScreenConfigFlagSpace =
  async function ReadSender_ScreenConfigFlagSpace(this: Session, addr: number): Promise<number> {
    const req = createReadSender_ScreenConfigFlagSpace(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_ScreenConfigFlagSpace =
  async function tryReadSender_ScreenConfigFlagSpace(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_ScreenConfigFlagSpace(addr);
    return this.connection.trySend(req);
  };
