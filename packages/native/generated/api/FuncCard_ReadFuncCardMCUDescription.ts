import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardMCUDescription(addr: number): Promise<Buffer>;
    tryFuncCard_ReadFuncCardMCUDescription(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardMCUDescription(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_MCUDescriptionOccupancy,
    'FuncCard_ReadFuncCardMCUDescription'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardMCUDescription =
  async function FuncCard_ReadFuncCardMCUDescription(this: Session, addr: number): Promise<Buffer> {
    const req = createFuncCard_ReadFuncCardMCUDescription(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadFuncCardMCUDescription =
  async function tryFuncCard_ReadFuncCardMCUDescription(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardMCUDescription(addr);
    return this.connection.trySend(req);
  };
