import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardMCUVersion(
      addr: number,
      bBroadcast: boolean,
      mcuVersion: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardMCUVersion(addr: number, mcuVersion: number): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardMCUVersion<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  mcuVersion: number
): Request<Broadcast> {
  const $data = encodeUIntLE(mcuVersion, AddressMapping.FuncCard_MCUVersionOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCUVersion');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MCUVersionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardMCUVersion = async function FuncCard_SetFuncCardMCUVersion(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  mcuVersion: number
): Promise<void> {
  const req = createFuncCard_SetFuncCardMCUVersion(addr, bBroadcast, mcuVersion);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetFuncCardMCUVersion =
  async function tryFuncCard_SetFuncCardMCUVersion(
    this: Session,
    addr: number,
    mcuVersion: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardMCUVersion(addr, false, mcuVersion);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
