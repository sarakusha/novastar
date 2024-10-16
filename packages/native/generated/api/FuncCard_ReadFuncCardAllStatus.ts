import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardAllStatus(addr: number): Promise<number>;
    tryFuncCard_ReadFuncCardAllStatus(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardAllStatus(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_FuncCardAllStatusOccupancy,
    'FuncCard_ReadFuncCardAllStatus'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FuncCardAllStatusAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardAllStatus = async function FuncCard_ReadFuncCardAllStatus(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadFuncCardAllStatus(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadFuncCardAllStatus =
  async function tryFuncCard_ReadFuncCardAllStatus(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFuncCardAllStatus(addr);
    return this.connection.trySend(req);
  };
