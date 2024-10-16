import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCompanyID(addr: number): Promise<number>;
    tryReadCompanyID(addr: number): Promise<Packet | null>;
  }
}
export default function createReadCompanyID(addr: number): Request {
  const req = new Request(AddressMapping.CompanyIdOccupancy, 'ReadCompanyID');
  req.destination = addr;
  req.address = AddressMapping.CompanyIdAddr;
  return req;
}
Session.prototype.ReadCompanyID = async function ReadCompanyID(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadCompanyID(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCompanyID = async function tryReadCompanyID(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadCompanyID(addr);
  return this.connection.trySend(req);
};
