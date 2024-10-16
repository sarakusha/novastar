import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardFPGAVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      fpgaVersion: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardFPGAVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      fpgaVersion: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardFPGAVersion_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  fpgaVersion: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fpgaVersion, AddressMapping.FuncCard_FPGAVersionOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGAVersion_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_FPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardFPGAVersion_1 =
  async function FuncCard_SetFuncCardFPGAVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    fpgaVersion: number
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardFPGAVersion_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      fpgaVersion
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardFPGAVersion_1 =
  async function tryFuncCard_SetFuncCardFPGAVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    fpgaVersion: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardFPGAVersion_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      fpgaVersion
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
