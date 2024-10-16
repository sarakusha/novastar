import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadCompanyID(addr: number): Promise<number>;
    tryFuncCard_ReadCompanyID(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadCompanyID(addr: number): Request {
  const req = new Request(AddressMapping.FuncCard_CompanyIDOccupancy, 'FuncCard_ReadCompanyID');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_CompanyIDAddr;
  return req;
}
Session.prototype.FuncCard_ReadCompanyID = async function FuncCard_ReadCompanyID(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadCompanyID(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadCompanyID = async function tryFuncCard_ReadCompanyID(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadCompanyID(addr);
  return this.connection.trySend(req);
};
