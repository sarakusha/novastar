import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardMCUDescription_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      mcuDescription: number[] | Buffer
    ): Promise<void>;
    tryFuncCard_SetFuncCardMCUDescription_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      mcuDescription: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardMCUDescription_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  mcuDescription: number[] | Buffer
): Request<Broadcast> {
  if (mcuDescription.length !== AddressMapping.FuncCard_MCUDescriptionOccupancy)
    throw new TypeError(`Invalid buffer size: ${mcuDescription.length}`);
  const req = new Request(mcuDescription, bBroadcast, 'FuncCard_SetFuncCardMCUDescription_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardMCUDescription_1 =
  async function FuncCard_SetFuncCardMCUDescription_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    mcuDescription: number[] | Buffer
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardMCUDescription_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      mcuDescription
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardMCUDescription_1 =
  async function tryFuncCard_SetFuncCardMCUDescription_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    mcuDescription: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardMCUDescription_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      mcuDescription
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
