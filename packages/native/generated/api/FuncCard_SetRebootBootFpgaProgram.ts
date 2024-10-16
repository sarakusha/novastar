import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetRebootBootFpgaProgram(
      addr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryFuncCard_SetRebootBootFpgaProgram(
      addr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetRebootBootFpgaProgram<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_RebootBootFpgaProgramOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetRebootBootFpgaProgram');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_RebootBootFpgaProgramAddr;
  return req;
}
Session.prototype.FuncCard_SetRebootBootFpgaProgram =
  async function FuncCard_SetRebootBootFpgaProgram(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createFuncCard_SetRebootBootFpgaProgram(addr, bBroadcast, funcCardModle);
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetRebootBootFpgaProgram =
  async function tryFuncCard_SetRebootBootFpgaProgram(
    this: Session,
    addr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetRebootBootFpgaProgram(addr, false, funcCardModle);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
