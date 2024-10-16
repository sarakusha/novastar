import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadCompanyID(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryDistribute_ReadCompanyID(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadCompanyID(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(AddressMapping.Distribute_CompanyIDOccupancy, 'Distribute_ReadCompanyID');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_CompanyIDAddr;
  return req;
}
Session.prototype.Distribute_ReadCompanyID = async function Distribute_ReadCompanyID(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number
): Promise<number> {
  const req = createDistribute_ReadCompanyID(addr, portAddr, distributeAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryDistribute_ReadCompanyID = async function tryDistribute_ReadCompanyID(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number
): Promise<Packet | null> {
  const req = createDistribute_ReadCompanyID(addr, portAddr, distributeAddr);
  return this.connection.trySend(req);
};
