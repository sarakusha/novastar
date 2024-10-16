import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadGoldenFPGAVersion(addr: number): Promise<number>;
    tryFuncCard_ReadGoldenFPGAVersion(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadGoldenFPGAVersion(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_GoldenFPGAVersionOccupancy,
    'FuncCard_ReadGoldenFPGAVersion'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_GoldenFPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_ReadGoldenFPGAVersion = async function FuncCard_ReadGoldenFPGAVersion(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadGoldenFPGAVersion(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadGoldenFPGAVersion =
  async function tryFuncCard_ReadGoldenFPGAVersion(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadGoldenFPGAVersion(addr);
    return this.connection.trySend(req);
  };
