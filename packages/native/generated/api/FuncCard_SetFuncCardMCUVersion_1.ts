import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardMCUVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      mcuVersion: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardMCUVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      mcuVersion: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardMCUVersion_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  mcuVersion: number
): Request<Broadcast> {
  const $data = encodeUIntLE(mcuVersion, AddressMapping.FuncCard_MCUVersionOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCUVersion_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_MCUVersionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardMCUVersion_1 =
  async function FuncCard_SetFuncCardMCUVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    mcuVersion: number
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardMCUVersion_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      mcuVersion
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardMCUVersion_1 =
  async function tryFuncCard_SetFuncCardMCUVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    mcuVersion: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardMCUVersion_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      mcuVersion
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
