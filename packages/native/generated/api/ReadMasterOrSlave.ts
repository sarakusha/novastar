import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMasterOrSlave(addr: number): Promise<number>;
    tryReadMasterOrSlave(addr: number): Promise<Packet | null>;
  }
}
export default function createReadMasterOrSlave(addr: number): Request {
  const req = new Request(AddressMapping.MasterOrSlaveOccupancy, 'ReadMasterOrSlave');
  req.destination = addr;
  req.address = AddressMapping.MasterOrSlaveAddr;
  return req;
}
Session.prototype.ReadMasterOrSlave = async function ReadMasterOrSlave(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadMasterOrSlave(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadMasterOrSlave = async function tryReadMasterOrSlave(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadMasterOrSlave(addr);
  return this.connection.trySend(req);
};
