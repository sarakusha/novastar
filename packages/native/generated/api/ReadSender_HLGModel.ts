import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HLGModel(addr: number): Promise<number>;
    tryReadSender_HLGModel(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HLGModel(addr: number): Request {
  const req = new Request(AddressMapping.HLGModelOccupancy, 'ReadSender_HLGModel');
  req.destination = addr;
  req.address = AddressMapping.HLGModelAddr;
  return req;
}
Session.prototype.ReadSender_HLGModel = async function ReadSender_HLGModel(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_HLGModel(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_HLGModel = async function tryReadSender_HLGModel(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_HLGModel(addr);
  return this.connection.trySend(req);
};
