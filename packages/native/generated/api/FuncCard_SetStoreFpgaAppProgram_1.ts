import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetStoreFpgaAppProgram_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      funcCardModle: number
    ): Promise<void>;
    tryFuncCard_SetStoreFpgaAppProgram_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      funcCardModle: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetStoreFpgaAppProgram_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  funcCardModle: number
): Request<Broadcast> {
  const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_StoreFpgaAppProgramOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaAppProgram_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_StoreFpgaAppProgramAddr;
  return req;
}
Session.prototype.FuncCard_SetStoreFpgaAppProgram_1 =
  async function FuncCard_SetStoreFpgaAppProgram_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const req = createFuncCard_SetStoreFpgaAppProgram_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      funcCardModle
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetStoreFpgaAppProgram_1 =
  async function tryFuncCard_SetStoreFpgaAppProgram_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    funcCardModle: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetStoreFpgaAppProgram_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      funcCardModle
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
