import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardMCULength(
      addr: number,
      bBroadcast: boolean,
      mcuLength: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardMCULength(addr: number, mcuLength: number): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardMCULength<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  mcuLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(mcuLength, AddressMapping.FuncCard_MCUProgramLengthOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCULength');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardMCULength = async function FuncCard_SetFuncCardMCULength(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  mcuLength: number
): Promise<void> {
  const req = createFuncCard_SetFuncCardMCULength(addr, bBroadcast, mcuLength);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetFuncCardMCULength =
  async function tryFuncCard_SetFuncCardMCULength(
    this: Session,
    addr: number,
    mcuLength: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardMCULength(addr, false, mcuLength);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
