import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetRebootAppFpgaProgram_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryFuncCard_SetRebootAppFpgaProgram_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetRebootAppFpgaProgram_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_RebootAppFpgaProgramOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetRebootAppFpgaProgram_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_RebootAppFpgaProgramAddr;
  return req;
}
Session.prototype.FuncCard_SetRebootAppFpgaProgram_1 =
  async function FuncCard_SetRebootAppFpgaProgram_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createFuncCard_SetRebootAppFpgaProgram_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      funcCardModle
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetRebootAppFpgaProgram_1 =
  async function tryFuncCard_SetRebootAppFpgaProgram_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetRebootAppFpgaProgram_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      funcCardModle
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
