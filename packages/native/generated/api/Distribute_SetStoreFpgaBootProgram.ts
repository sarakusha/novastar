import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetStoreFpgaBootProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryDistribute_SetStoreFpgaBootProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetStoreFpgaBootProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    funcCardModle,
    AddressMapping.Distribute_StoreFpgaBootProgramOccupancy
  );
  const req = new Request($data, bBroadcast, 'Distribute_SetStoreFpgaBootProgram');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_StoreFpgaBootProgramAddr;
  return req;
}
Session.prototype.Distribute_SetStoreFpgaBootProgram =
  async function Distribute_SetStoreFpgaBootProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createDistribute_SetStoreFpgaBootProgram(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      funcCardModle
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetStoreFpgaBootProgram =
  async function tryDistribute_SetStoreFpgaBootProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetStoreFpgaBootProgram(
      addr,
      portAddr,
      distributeAddr,
      false,
      funcCardModle
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
