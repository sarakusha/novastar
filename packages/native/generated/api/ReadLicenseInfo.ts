import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLicenseInfo(addr: number): Promise<Buffer>;
    tryReadLicenseInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadLicenseInfo(addr: number): Request {
  const req = new Request(AddressMapping.LicenseInfoOccupancy, 'ReadLicenseInfo');
  req.destination = addr;
  req.address = AddressMapping.LicenseInfoAddr;
  return req;
}
Session.prototype.ReadLicenseInfo = async function ReadLicenseInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadLicenseInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadLicenseInfo = async function tryReadLicenseInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadLicenseInfo(addr);
  return this.connection.trySend(req);
};
