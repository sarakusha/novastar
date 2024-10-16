import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadHumiOfFuncCard(addr: number): Promise<number>;
    tryFuncCard_ReadHumiOfFuncCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadHumiOfFuncCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_HumidityOfFuncCardOccupancy,
    'FuncCard_ReadHumiOfFuncCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_HumidityOfFuncCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadHumiOfFuncCard = async function FuncCard_ReadHumiOfFuncCard(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadHumiOfFuncCard(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadHumiOfFuncCard = async function tryFuncCard_ReadHumiOfFuncCard(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadHumiOfFuncCard(addr);
  return this.connection.trySend(req);
};
