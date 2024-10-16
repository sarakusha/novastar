import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMasterOrSlaveNext(addr: number): Promise<number>;
    tryReadMasterOrSlaveNext(addr: number): Promise<Packet | null>;
  }
}
export default function createReadMasterOrSlaveNext(addr: number): Request {
  const req = new Request(AddressMapping.MasterOrSlaveOccupancy, 'ReadMasterOrSlaveNext');
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveNewAddr;
  return req;
}
Session.prototype.ReadMasterOrSlaveNext = async function ReadMasterOrSlaveNext(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadMasterOrSlaveNext(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMasterOrSlaveNext = async function tryReadMasterOrSlaveNext(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadMasterOrSlaveNext(addr);
  return this.connection.trySend(req);
};
