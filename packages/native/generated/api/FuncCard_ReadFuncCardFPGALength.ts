import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardFPGALength(addr: number): Promise<number>;
    tryFuncCard_ReadFuncCardFPGALength(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardFPGALength(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_FPGALengthOccupancy,
    'FuncCard_ReadFuncCardFPGALength'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FPGALengthAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardFPGALength = async function FuncCard_ReadFuncCardFPGALength(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadFuncCardFPGALength(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadFuncCardFPGALength =
  async function tryFuncCard_ReadFuncCardFPGALength(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardFPGALength(addr);
    return this.connection.trySend(req);
  };
