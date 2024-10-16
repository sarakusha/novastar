import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_DistributeEnable(addr: number): Promise<number>;
    tryReadSender_DistributeEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_DistributeEnable(addr: number): Request {
  const req = new Request(AddressMapping.DistributeEnableOccupancy, 'ReadSender_DistributeEnable');
  req.destination = addr;
  req.address = AddressMapping.DistributeEnableAddr;
  return req;
}
Session.prototype.ReadSender_DistributeEnable = async function ReadSender_DistributeEnable(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_DistributeEnable(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_DistributeEnable = async function tryReadSender_DistributeEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_DistributeEnable(addr);
  return this.connection.trySend(req);
};
