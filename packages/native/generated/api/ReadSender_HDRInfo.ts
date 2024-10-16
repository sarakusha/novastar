import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HDRInfo(addr: number): Promise<number>;
    tryReadSender_HDRInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HDRInfo(addr: number): Request {
  const req = new Request(AddressMapping.HDRInfoOccupancy, 'ReadSender_HDRInfo');
  req.destination = addr;
  req.address = AddressMapping.HDRInfoAddr;
  return req;
}
Session.prototype.ReadSender_HDRInfo = async function ReadSender_HDRInfo(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_HDRInfo(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_HDRInfo = async function tryReadSender_HDRInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_HDRInfo(addr);
  return this.connection.trySend(req);
};
