import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetStoreFpgaBootProgram(
      addr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryFuncCard_SetStoreFpgaBootProgram(
      addr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetStoreFpgaBootProgram<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_StoreFpgaBootProgramOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaBootProgram');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_StoreFpgaBootProgramAddr;
  return req;
}
Session.prototype.FuncCard_SetStoreFpgaBootProgram =
  async function FuncCard_SetStoreFpgaBootProgram(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createFuncCard_SetStoreFpgaBootProgram(addr, bBroadcast, funcCardModle);
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetStoreFpgaBootProgram =
  async function tryFuncCard_SetStoreFpgaBootProgram(
    this: Session,
    addr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetStoreFpgaBootProgram(addr, false, funcCardModle);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
