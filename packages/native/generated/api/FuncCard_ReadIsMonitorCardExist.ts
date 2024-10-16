import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadIsMonitorCardExist(addr: number): Promise<number>;
    tryFuncCard_ReadIsMonitorCardExist(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadIsMonitorCardExist(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_IsMonitorCardExistOccupancy,
    'FuncCard_ReadIsMonitorCardExist'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_IsMonitorCardExistAddr;
  return req;
}
Session.prototype.FuncCard_ReadIsMonitorCardExist = async function FuncCard_ReadIsMonitorCardExist(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadIsMonitorCardExist(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadIsMonitorCardExist =
  async function tryFuncCard_ReadIsMonitorCardExist(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadIsMonitorCardExist(addr);
    return this.connection.trySend(req);
  };
