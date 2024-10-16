import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetDistributeMCUVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      mcuVersion: number
    ): Promise<void>;
    tryDistribute_SetDistributeMCUVersion(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      mcuVersion: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetDistributeMCUVersion<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  mcuVersion: number
): Request<Broadcast> {
  const $data = encodeUIntLE(mcuVersion, AddressMapping.Distribute_MCUVersionOccupancy);
  const req = new Request($data, bBroadcast, 'Distribute_SetDistributeMCUVersion');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_MCUVersionAddr;
  return req;
}
Session.prototype.Distribute_SetDistributeMCUVersion =
  async function Distribute_SetDistributeMCUVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    mcuVersion: number
  ): Promise<void> {
    const req = createDistribute_SetDistributeMCUVersion(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      mcuVersion
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetDistributeMCUVersion =
  async function tryDistribute_SetDistributeMCUVersion(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    mcuVersion: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetDistributeMCUVersion(
      addr,
      portAddr,
      distributeAddr,
      false,
      mcuVersion
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
