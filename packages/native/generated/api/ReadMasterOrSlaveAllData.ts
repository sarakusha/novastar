import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadMasterOrSlaveAllData(addr: number): Promise<Buffer>;
    tryReadMasterOrSlaveAllData(addr: number): Promise<Packet | null>;
  }
}
export default function createReadMasterOrSlaveAllData(addr: number): Request {
  const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadMasterOrSlaveAllData');
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr;
  return req;
}
Session.prototype.ReadMasterOrSlaveAllData = async function ReadMasterOrSlaveAllData(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadMasterOrSlaveAllData(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadMasterOrSlaveAllData = async function tryReadMasterOrSlaveAllData(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadMasterOrSlaveAllData(addr);
  return this.connection.trySend(req);
};
