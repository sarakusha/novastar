import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HDRState(addr: number): Promise<number>;
    tryReadSender_HDRState(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HDRState(addr: number): Request {
  const req = new Request(AddressMapping.HDREnableInfoOccupancy, 'ReadSender_HDRState');
  req.destination = addr;
  req.address = AddressMapping.HDRInfoAddr;
  return req;
}
Session.prototype.ReadSender_HDRState = async function ReadSender_HDRState(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_HDRState(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_HDRState = async function tryReadSender_HDRState(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_HDRState(addr);
  return this.connection.trySend(req);
};
