import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ThreeDPerSpace(addr: number): Promise<number>;
    tryReadSender_ThreeDPerSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ThreeDPerSpace(addr: number): Request {
  const req = new Request(AddressMapping.ThreeDPerOccupancy, 'ReadSender_ThreeDPerSpace');
  req.destination = addr;
  req.address = AddressMapping.ThreeDPerAddr;
  return req;
}
Session.prototype.ReadSender_ThreeDPerSpace = async function ReadSender_ThreeDPerSpace(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_ThreeDPerSpace(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_ThreeDPerSpace = async function tryReadSender_ThreeDPerSpace(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_ThreeDPerSpace(addr);
  return this.connection.trySend(req);
};
