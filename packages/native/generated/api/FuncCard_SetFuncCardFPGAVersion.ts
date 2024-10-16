import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardFPGAVersion(
      addr: number,
      bBroadcast: boolean,
      fpgaVersion: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardFPGAVersion(
      addr: number,
      fpgaVersion: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardFPGAVersion<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  fpgaVersion: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fpgaVersion, AddressMapping.FuncCard_FPGAVersionOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGAVersion');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FPGAVersionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardFPGAVersion = async function FuncCard_SetFuncCardFPGAVersion(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  fpgaVersion: number
): Promise<void> {
  const req = createFuncCard_SetFuncCardFPGAVersion(addr, bBroadcast, fpgaVersion);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetFuncCardFPGAVersion =
  async function tryFuncCard_SetFuncCardFPGAVersion(
    this: Session,
    addr: number,
    fpgaVersion: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardFPGAVersion(addr, false, fpgaVersion);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
