import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAllPortEnable(addr: number): Promise<Buffer>;
    tryReadAllPortEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadAllPortEnable(addr: number): Request {
  const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortEnable');
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr;
  return req;
}
Session.prototype.ReadAllPortEnable = async function ReadAllPortEnable(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadAllPortEnable(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadAllPortEnable = async function tryReadAllPortEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadAllPortEnable(addr);
  return this.connection.trySend(req);
};
