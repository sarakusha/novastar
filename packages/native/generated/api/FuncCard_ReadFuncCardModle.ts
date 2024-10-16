import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFuncCardModle(addr: number): Promise<number>;
    tryFuncCard_ReadFuncCardModle(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFuncCardModle(addr: number): Request {
  const req = new Request(AddressMapping.FuncCard_ModleOccupancy, 'FuncCard_ReadFuncCardModle');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_ModleAddr;
  return req;
}
Session.prototype.FuncCard_ReadFuncCardModle = async function FuncCard_ReadFuncCardModle(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadFuncCardModle(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadFuncCardModle = async function tryFuncCard_ReadFuncCardModle(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadFuncCardModle(addr);
  return this.connection.trySend(req);
};
