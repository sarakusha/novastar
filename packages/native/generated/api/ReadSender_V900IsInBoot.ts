import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_V900IsInBoot(addr: number): Promise<number>;
    tryReadSender_V900IsInBoot(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_V900IsInBoot(addr: number): Request {
  const req = new Request(AddressMapping.Sender_V900IsInBootOccupancy, 'ReadSender_V900IsInBoot');
  req.destination = addr;
  req.address = AddressMapping.Sender_V900IsInBootAddr;
  return req;
}
Session.prototype.ReadSender_V900IsInBoot = async function ReadSender_V900IsInBoot(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_V900IsInBoot(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_V900IsInBoot = async function tryReadSender_V900IsInBoot(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_V900IsInBoot(addr);
  return this.connection.trySend(req);
};
