import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetFuncCardFPGADescription(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      distribute_FPGADescription: number[] | Buffer
    ): Promise<void>;
    tryDistribute_SetFuncCardFPGADescription(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      distribute_FPGADescription: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetFuncCardFPGADescription<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  distribute_FPGADescription: number[] | Buffer
): Request<Broadcast> {
  if (distribute_FPGADescription.length !== AddressMapping.Distribute_FPGADescriptionnOccupancy)
    throw new TypeError(`Invalid buffer size: ${distribute_FPGADescription.length}`);
  const req = new Request(
    distribute_FPGADescription,
    bBroadcast,
    'Distribute_SetFuncCardFPGADescription'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_FPGADescriptionAddr;
  return req;
}
Session.prototype.Distribute_SetFuncCardFPGADescription =
  async function Distribute_SetFuncCardFPGADescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    distribute_FPGADescription: number[] | Buffer
  ): Promise<void> {
    const req = createDistribute_SetFuncCardFPGADescription(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      distribute_FPGADescription
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetFuncCardFPGADescription =
  async function tryDistribute_SetFuncCardFPGADescription(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    distribute_FPGADescription: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetFuncCardFPGADescription(
      addr,
      portAddr,
      distributeAddr,
      false,
      distribute_FPGADescription
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
