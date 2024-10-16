import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetFuncCardFPGAVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      fpgaVersion: number
    ): Promise<void>;
    tryDistribute_SetFuncCardFPGAVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      fpgaVersion: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetFuncCardFPGAVersion<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  fpgaVersion: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fpgaVersion, AddressMapping.Distribute_FPGAVersionOccupancy);
  const req = new Request($data, bBroadcast, 'Distribute_SetFuncCardFPGAVersion');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_FPGAVersionAddr;
  return req;
}
Session.prototype.Distribute_SetFuncCardFPGAVersion =
  async function Distribute_SetFuncCardFPGAVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    fpgaVersion: number
  ): Promise<void> {
    const req = createDistribute_SetFuncCardFPGAVersion(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      fpgaVersion
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetFuncCardFPGAVersion =
  async function tryDistribute_SetFuncCardFPGAVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    fpgaVersion: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetFuncCardFPGAVersion(
      addr,
      portAddr,
      distributeAddr,
      false,
      fpgaVersion
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
