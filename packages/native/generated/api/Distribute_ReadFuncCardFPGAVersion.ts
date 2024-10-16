import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_ReadFuncCardFPGAVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryDistribute_ReadFuncCardFPGAVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createDistribute_ReadFuncCardFPGAVersion(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.Distribute_FPGAVersionOccupancy,
    'Distribute_ReadFuncCardFPGAVersion'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_FPGAVersionAddr;
  return req;
}
Session.prototype.Distribute_ReadFuncCardFPGAVersion =
  async function Distribute_ReadFuncCardFPGAVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = createDistribute_ReadFuncCardFPGAVersion(addr, portAddr, distributeAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryDistribute_ReadFuncCardFPGAVersion =
  async function tryDistribute_ReadFuncCardFPGAVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createDistribute_ReadFuncCardFPGAVersion(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
