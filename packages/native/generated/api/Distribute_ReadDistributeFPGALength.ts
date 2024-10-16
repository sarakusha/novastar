import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadDistributeFPGALength(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryDistribute_ReadDistributeFPGALength(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadDistributeFPGALength(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_FPGALengthOccupancy,
    'Distribute_ReadDistributeFPGALength'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_FPGALengthAddr;
  return req;
}
Session.prototype.Distribute_ReadDistributeFPGALength =
  async function Distribute_ReadDistributeFPGALength(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = createDistribute_ReadDistributeFPGALength(addr, portAddr, distributeAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryDistribute_ReadDistributeFPGALength =
  async function tryDistribute_ReadDistributeFPGALength(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadDistributeFPGALength(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
