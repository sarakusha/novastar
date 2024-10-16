import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadGoldenFPGAVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryDistribute_ReadGoldenFPGAVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadGoldenFPGAVersion(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_GoldenFPGAVersionOccupancy,
    'Distribute_ReadGoldenFPGAVersion'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_GoldenFPGAVersionAddr;
  return req;
}
Session.prototype.Distribute_ReadGoldenFPGAVersion =
  async function Distribute_ReadGoldenFPGAVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = createDistribute_ReadGoldenFPGAVersion(addr, portAddr, distributeAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryDistribute_ReadGoldenFPGAVersion =
  async function tryDistribute_ReadGoldenFPGAVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadGoldenFPGAVersion(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
