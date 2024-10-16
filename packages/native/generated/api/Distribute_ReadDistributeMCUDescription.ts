import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadDistributeMCUDescription(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Buffer>;
    tryDistribute_ReadDistributeMCUDescription(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadDistributeMCUDescription(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_MCUDescriptionOccupancy,
    'Distribute_ReadDistributeMCUDescription'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_MCUDescriptionAddr;
  return req;
}
Session.prototype.Distribute_ReadDistributeMCUDescription =
  async function Distribute_ReadDistributeMCUDescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Buffer> {
    const req = createDistribute_ReadDistributeMCUDescription(addr, portAddr, distributeAddr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryDistribute_ReadDistributeMCUDescription =
  async function tryDistribute_ReadDistributeMCUDescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadDistributeMCUDescription(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
