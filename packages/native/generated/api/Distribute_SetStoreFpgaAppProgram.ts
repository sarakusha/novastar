import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetStoreFpgaAppProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      distributeModle: number
    ): Promise<void>;
    tryDistribute_SetStoreFpgaAppProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      distributeModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetStoreFpgaAppProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  distributeModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    distributeModle,
    AddressMapping.Distribute_StoreFpgaAppProgramOccupancy
  );
  const req = new Request($data, bBroadcast, 'Distribute_SetStoreFpgaAppProgram');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_StoreFpgaAppProgramAddr;
  return req;
}
Session.prototype.Distribute_SetStoreFpgaAppProgram =
  async function Distribute_SetStoreFpgaAppProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    distributeModle: number
  ): Promise<void> {
    const req = createDistribute_SetStoreFpgaAppProgram(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      distributeModle
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetStoreFpgaAppProgram =
  async function tryDistribute_SetStoreFpgaAppProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    distributeModle: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetStoreFpgaAppProgram(
      addr,
      portAddr,
      distributeAddr,
      false,
      distributeModle
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
