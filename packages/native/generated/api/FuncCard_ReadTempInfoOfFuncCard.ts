import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadTempInfoOfFuncCard(addr: number): Promise<number>;
    tryFuncCard_ReadTempInfoOfFuncCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadTempInfoOfFuncCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_TempInfoOfFuncCardOccupancy,
    'FuncCard_ReadTempInfoOfFuncCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_TempInfoOfFuncCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadTempInfoOfFuncCard = async function FuncCard_ReadTempInfoOfFuncCard(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadTempInfoOfFuncCard(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadTempInfoOfFuncCard =
  async function tryFuncCard_ReadTempInfoOfFuncCard(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadTempInfoOfFuncCard(addr);
    return this.connection.trySend(req);
  };
