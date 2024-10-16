import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadDistributeFPGADescription(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Buffer>;
    tryDistribute_ReadDistributeFPGADescription(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadDistributeFPGADescription(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_FPGADescriptionnOccupancy,
    'Distribute_ReadDistributeFPGADescription'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_FPGADescriptionAddr;
  return req;
}
Session.prototype.Distribute_ReadDistributeFPGADescription =
  async function Distribute_ReadDistributeFPGADescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Buffer> {
    const req = createDistribute_ReadDistributeFPGADescription(addr, portAddr, distributeAddr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryDistribute_ReadDistributeFPGADescription =
  async function tryDistribute_ReadDistributeFPGADescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadDistributeFPGADescription(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
