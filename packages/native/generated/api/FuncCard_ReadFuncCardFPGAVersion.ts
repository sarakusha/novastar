import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardFPGAVersion(addr: number): Promise<number>;
    tryFuncCard_ReadFuncCardFPGAVersion(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardFPGAVersion(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_FPGAVersionOccupancy,
    'FuncCard_ReadFuncCardFPGAVersion'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardFPGAVersion =
  async function FuncCard_ReadFuncCardFPGAVersion(this: Session, addr: number): Promise<number> {
    const req = createFuncCard_ReadFuncCardFPGAVersion(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadFuncCardFPGAVersion =
  async function tryFuncCard_ReadFuncCardFPGAVersion(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardFPGAVersion(addr);
    return this.connection.trySend(req);
  };
