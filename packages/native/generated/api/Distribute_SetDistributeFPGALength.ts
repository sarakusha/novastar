import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetDistributeFPGALength(
      addr: number,
      portAddr: number,
      distributAddr: number,
      bBroadcast: boolean,
      fpgaLength: number
    ): Promise<void>;
    tryDistribute_SetDistributeFPGALength(
      addr: number,
      portAddr: number,
      distributAddr: number,
      fpgaLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetDistributeFPGALength<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributAddr: number,
  bBroadcast: Broadcast,
  fpgaLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fpgaLength, AddressMapping.Distribute_FPGALengthOccupancy);
  const req = new Request($data, bBroadcast, 'Distribute_SetDistributeFPGALength');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributAddr;
  req.address = AddressMapping.Distribute_FPGALengthAddr;
  return req;
}
Session.prototype.Distribute_SetDistributeFPGALength =
  async function Distribute_SetDistributeFPGALength(
    this: Session,
    addr: number,
    portAddr: number,
    distributAddr: number,
    bBroadcast: boolean,
    fpgaLength: number
  ): Promise<void> {
    const req = createDistribute_SetDistributeFPGALength(
      addr,
      portAddr,
      distributAddr,
      bBroadcast,
      fpgaLength
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetDistributeFPGALength =
  async function tryDistribute_SetDistributeFPGALength(
    this: Session,
    addr: number,
    portAddr: number,
    distributAddr: number,
    fpgaLength: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetDistributeFPGALength(
      addr,
      portAddr,
      distributAddr,
      false,
      fpgaLength
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
