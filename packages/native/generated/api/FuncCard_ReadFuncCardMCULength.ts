import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardMCULength(addr: number): Promise<number>;
    tryFuncCard_ReadFuncCardMCULength(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardMCULength(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MCUProgramLengthOccupancy,
    'FuncCard_ReadFuncCardMCULength'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardMCULength = async function FuncCard_ReadFuncCardMCULength(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadFuncCardMCULength(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadFuncCardMCULength =
  async function tryFuncCard_ReadFuncCardMCULength(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardMCULength(addr);
    return this.connection.trySend(req);
  };
