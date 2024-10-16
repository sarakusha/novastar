import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetRebootBootFpgaProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryDistribute_SetRebootBootFpgaProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetRebootBootFpgaProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    funcCardModle,
    AddressMapping.Distribute_RebootBootFpgaProgramOccupancy
  );
  const req = new Request($data, bBroadcast, 'Distribute_SetRebootBootFpgaProgram');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_RebootBootFpgaProgramAddr;
  return req;
}
Session.prototype.Distribute_SetRebootBootFpgaProgram =
  async function Distribute_SetRebootBootFpgaProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createDistribute_SetRebootBootFpgaProgram(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      funcCardModle
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetRebootBootFpgaProgram =
  async function tryDistribute_SetRebootBootFpgaProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetRebootBootFpgaProgram(
      addr,
      portAddr,
      distributeAddr,
      false,
      funcCardModle
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
