import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardMCUDescription(
      addr: number,
      bBroadcast: boolean,
      funcCard_MCUDescription: number[] | Buffer
    ): Promise<void>;
    tryFuncCard_SetFuncCardMCUDescription(
      addr: number,
      funcCard_MCUDescription: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardMCUDescription<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  funcCard_MCUDescription: number[] | Buffer
): Request<Broadcast> {
  if (funcCard_MCUDescription.length !== AddressMapping.FuncCard_MCUDescriptionOccupancy)
    throw new TypeError(`Invalid buffer size: ${funcCard_MCUDescription.length}`);
  const req = new Request(
    funcCard_MCUDescription,
    bBroadcast,
    'FuncCard_SetFuncCardMCUDescription'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardMCUDescription =
  async function FuncCard_SetFuncCardMCUDescription(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    funcCard_MCUDescription: number[] | Buffer
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardMCUDescription(addr, bBroadcast, funcCard_MCUDescription);
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardMCUDescription =
  async function tryFuncCard_SetFuncCardMCUDescription(
    this: Session,
    addr: number,
    funcCard_MCUDescription: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardMCUDescription(addr, false, funcCard_MCUDescription);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
