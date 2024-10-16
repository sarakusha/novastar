import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadGoldenFPGAVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<number>;
    tryFuncCard_ReadGoldenFPGAVersion_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadGoldenFPGAVersion_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_GoldenFPGAVersionOccupancy,
    'FuncCard_ReadGoldenFPGAVersion_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_GoldenFPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_ReadGoldenFPGAVersion_1 =
  async function FuncCard_ReadGoldenFPGAVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = createFuncCard_ReadGoldenFPGAVersion_1(addr, portAddr, funcCardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryFuncCard_ReadGoldenFPGAVersion_1 =
  async function tryFuncCard_ReadGoldenFPGAVersion_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadGoldenFPGAVersion_1(addr, portAddr, funcCardAddr);
    return this.connection.trySend(req);
  };
