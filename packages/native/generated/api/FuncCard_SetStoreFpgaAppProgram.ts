import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetStoreFpgaAppProgram(
      addr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryFuncCard_SetStoreFpgaAppProgram(
      addr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetStoreFpgaAppProgram<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_StoreFpgaAppProgramOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaAppProgram');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_StoreFpgaAppProgramAddr;
  return req;
}
Session.prototype.FuncCard_SetStoreFpgaAppProgram = async function FuncCard_SetStoreFpgaAppProgram(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  funcCardModle: number
): Promise<void> {
  const req = createFuncCard_SetStoreFpgaAppProgram(addr, bBroadcast, funcCardModle);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetStoreFpgaAppProgram =
  async function tryFuncCard_SetStoreFpgaAppProgram(
    this: Session,
    addr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetStoreFpgaAppProgram(addr, false, funcCardModle);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
