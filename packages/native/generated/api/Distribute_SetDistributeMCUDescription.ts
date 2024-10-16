import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetDistributeMCUDescription(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      mcuDescription: number[] | Buffer
    ): Promise<void>;
    tryDistribute_SetDistributeMCUDescription(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      mcuDescription: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetDistributeMCUDescription<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  mcuDescription: number[] | Buffer
): Request<Broadcast> {
  if (mcuDescription.length !== AddressMapping.Distribute_MCUDescriptionOccupancy)
    throw new TypeError(`Invalid buffer size: ${mcuDescription.length}`);
  const req = new Request(mcuDescription, bBroadcast, 'Distribute_SetDistributeMCUDescription');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_MCUDescriptionAddr;
  return req;
}
Session.prototype.Distribute_SetDistributeMCUDescription =
  async function Distribute_SetDistributeMCUDescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    mcuDescription: number[] | Buffer
  ): Promise<void> {
    const req = createDistribute_SetDistributeMCUDescription(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      mcuDescription
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetDistributeMCUDescription =
  async function tryDistribute_SetDistributeMCUDescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    mcuDescription: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetDistributeMCUDescription(
      addr,
      portAddr,
      distributeAddr,
      false,
      mcuDescription
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
