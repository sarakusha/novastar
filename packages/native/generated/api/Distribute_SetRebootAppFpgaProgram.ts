import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Distribute_SetRebootAppFpgaProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      distributeModle: number
    ): Promise<void>;
    tryDistribute_SetRebootAppFpgaProgram(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      distributeModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createDistribute_SetRebootAppFpgaProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  distributeModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    distributeModle,
    AddressMapping.Distribute_RebootAppFpgaProgramOccupancy
  );
  const req = new Request($data, bBroadcast, 'Distribute_SetRebootAppFpgaProgram');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.Distribute_RebootAppFpgaProgramAddr;
  return req;
}
Session.prototype.Distribute_SetRebootAppFpgaProgram =
  async function Distribute_SetRebootAppFpgaProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    distributeModle: number
  ): Promise<void> {
    const req = createDistribute_SetRebootAppFpgaProgram(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      distributeModle
    );
    await this.connection.send(req);
  };
Session.prototype.tryDistribute_SetRebootAppFpgaProgram =
  async function tryDistribute_SetRebootAppFpgaProgram(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    distributeModle: number
  ): Promise<ErrorType | null> {
    const req = createDistribute_SetRebootAppFpgaProgram(
      addr,
      portAddr,
      distributeAddr,
      false,
      distributeModle
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
