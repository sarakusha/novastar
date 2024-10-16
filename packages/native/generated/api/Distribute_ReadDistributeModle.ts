import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadDistributeModle(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryDistribute_ReadDistributeModle(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadDistributeModle(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_ModleOccupancy,
    'Distribute_ReadDistributeModle'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_ModleAddr;
  return req;
}
Session.prototype.Distribute_ReadDistributeModle = async function Distribute_ReadDistributeModle(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number
): Promise<number> {
  const req = createDistribute_ReadDistributeModle(addr, portAddr, distributeAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryDistribute_ReadDistributeModle =
  async function tryDistribute_ReadDistributeModle(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadDistributeModle(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
