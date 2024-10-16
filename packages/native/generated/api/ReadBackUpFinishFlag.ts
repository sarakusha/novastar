import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBackUpFinishFlag(addr: number): Promise<number>;
    tryReadBackUpFinishFlag(addr: number): Promise<Packet | null>;
  }
}
export default function createReadBackUpFinishFlag(addr: number): Request {
  const req = new Request(AddressMapping.BackUpFinishFlagAddrOccupancy, 'ReadBackUpFinishFlag');
  req.destination = addr;
  req.address = AddressMapping.BackUpFinishFlagAddr;
  return req;
}
Session.prototype.ReadBackUpFinishFlag = async function ReadBackUpFinishFlag(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadBackUpFinishFlag(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBackUpFinishFlag = async function tryReadBackUpFinishFlag(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadBackUpFinishFlag(addr);
  return this.connection.trySend(req);
};
