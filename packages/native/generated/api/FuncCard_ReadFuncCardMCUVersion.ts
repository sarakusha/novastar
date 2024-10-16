import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardMCUVersion(addr: number): Promise<number>;
    tryFuncCard_ReadFuncCardMCUVersion(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardMCUVersion(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MCUVersionOccupancy,
    'FuncCard_ReadFuncCardMCUVersion'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MCUVersionAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardMCUVersion = async function FuncCard_ReadFuncCardMCUVersion(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadFuncCardMCUVersion(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadFuncCardMCUVersion =
  async function tryFuncCard_ReadFuncCardMCUVersion(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardMCUVersion(addr);
    return this.connection.trySend(req);
  };
