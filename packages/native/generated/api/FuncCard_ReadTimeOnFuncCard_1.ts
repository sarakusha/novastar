import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadTimeOnFuncCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Buffer>;
    tryFuncCard_ReadTimeOnFuncCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadTimeOnFuncCard_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_TimeOnFuncCardOccupancy,
    'FuncCard_ReadTimeOnFuncCard_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_TimeOnFuncCardAddr;
  return req;
}
Session.prototype.FuncCard_ReadTimeOnFuncCard_1 = async function FuncCard_ReadTimeOnFuncCard_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadTimeOnFuncCard_1(addr, portAddr, funcCardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadTimeOnFuncCard_1 =
  async function tryFuncCard_ReadTimeOnFuncCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadTimeOnFuncCard_1(addr, portAddr, funcCardAddr);
    return this.connection.trySend(req);
  };
