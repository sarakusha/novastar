import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetDistributeMCULength(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      mcuLength: number
    ): Promise<void>;
    tryDistribute_SetDistributeMCULength(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      mcuLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetDistributeMCULength<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  mcuLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(mcuLength, AddressMapping.Distribute_MCUProgramLengthOccupancy);
  const req = new Request($data, bBroadcast, 'Distribute_SetDistributeMCULength');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_MCUProgramLengthAddr;
  return req;
}
Session.prototype.Distribute_SetDistributeMCULength =
  async function Distribute_SetDistributeMCULength(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    mcuLength: number
  ): Promise<void> {
    const req = createDistribute_SetDistributeMCULength(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      mcuLength
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetDistributeMCULength =
  async function tryDistribute_SetDistributeMCULength(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    mcuLength: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetDistributeMCULength(
      addr,
      portAddr,
      distributeAddr,
      false,
      mcuLength
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
