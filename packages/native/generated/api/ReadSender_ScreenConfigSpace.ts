import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ScreenConfigSpace(addr: number): Promise<Buffer>;
    tryReadSender_ScreenConfigSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ScreenConfigSpace(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_ScreenConfigSpaceOccupancy,
    'ReadSender_ScreenConfigSpace'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_ScreenConfigSpaceAddr;
  return req;
}
Session.prototype.ReadSender_ScreenConfigSpace = async function ReadSender_ScreenConfigSpace(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_ScreenConfigSpace(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_ScreenConfigSpace = async function tryReadSender_ScreenConfigSpace(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_ScreenConfigSpace(addr);
  return this.connection.trySend(req);
};
