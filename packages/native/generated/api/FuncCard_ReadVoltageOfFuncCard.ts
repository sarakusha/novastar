import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadVoltageOfFuncCard(addr: number): Promise<number>;
    tryFuncCard_ReadVoltageOfFuncCard(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadVoltageOfFuncCard(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_VoltageOfFuncCardOccupancy,
    'FuncCard_ReadVoltageOfFuncCard'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_VoltageOfFuncCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadVoltageOfFuncCard = async function FuncCard_ReadVoltageOfFuncCard(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadVoltageOfFuncCard(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadVoltageOfFuncCard =
  async function tryFuncCard_ReadVoltageOfFuncCard(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadVoltageOfFuncCard(addr);
    return this.connection.trySend(req);
  };
