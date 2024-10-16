import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetRebootAppFpgaProgram(
      addr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryFuncCard_SetRebootAppFpgaProgram(
      addr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetRebootAppFpgaProgram<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_RebootAppFpgaProgramOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetRebootAppFpgaProgram');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_RebootAppFpgaProgramAddr;
  return req;
}
Session.prototype.FuncCard_SetRebootAppFpgaProgram =
  async function FuncCard_SetRebootAppFpgaProgram(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createFuncCard_SetRebootAppFpgaProgram(addr, bBroadcast, funcCardModle);
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetRebootAppFpgaProgram =
  async function tryFuncCard_SetRebootAppFpgaProgram(
    this: Session,
    addr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetRebootAppFpgaProgram(addr, false, funcCardModle);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
