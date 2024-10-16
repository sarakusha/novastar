import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadTimeOnFuncCard(addr: number): Promise<Buffer>;
    tryFuncCard_ReadTimeOnFuncCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadTimeOnFuncCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_TimeOnFuncCardOccupancy,
    'FuncCard_ReadTimeOnFuncCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_TimeOnFuncCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadTimeOnFuncCard = async function FuncCard_ReadTimeOnFuncCard(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadTimeOnFuncCard(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadTimeOnFuncCard = async function tryFuncCard_ReadTimeOnFuncCard(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadTimeOnFuncCard(addr);
  return this.connection.trySend(req);
};
