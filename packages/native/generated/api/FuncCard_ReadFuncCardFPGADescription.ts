import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardFPGADescription(addr: number): Promise<Buffer>;
    tryFuncCard_ReadFuncCardFPGADescription(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardFPGADescription(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_FPGADescriptionnOccupancy,
    'FuncCard_ReadFuncCardFPGADescription'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardFPGADescription =
  async function FuncCard_ReadFuncCardFPGADescription(
    this: Session,
    addr: number
  ): Promise<Buffer> {
    const req = createFuncCard_ReadFuncCardFPGADescription(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadFuncCardFPGADescription =
  async function tryFuncCard_ReadFuncCardFPGADescription(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardFPGADescription(addr);
    return this.connection.trySend(req);
  };
