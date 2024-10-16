import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadDistributeMCUVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryDistribute_ReadDistributeMCUVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadDistributeMCUVersion(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_MCUVersionOccupancy,
    'Distribute_ReadDistributeMCUVersion'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_MCUVersionAddr;
  return req;
}
Session.prototype.Distribute_ReadDistributeMCUVersion =
  async function Distribute_ReadDistributeMCUVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = createDistribute_ReadDistributeMCUVersion(addr, portAddr, distributeAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryDistribute_ReadDistributeMCUVersion =
  async function tryDistribute_ReadDistributeMCUVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadDistributeMCUVersion(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
