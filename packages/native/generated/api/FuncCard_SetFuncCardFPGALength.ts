import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardFPGALength(
      addr: number,
      bBroadcast: boolean,
      fpgaLength: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardFPGALength(addr: number, fpgaLength: number): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardFPGALength<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  fpgaLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fpgaLength, AddressMapping.FuncCard_FPGALengthOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGALength');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FPGALengthAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardFPGALength = async function FuncCard_SetFuncCardFPGALength(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  fpgaLength: number
): Promise<void> {
  const req = createFuncCard_SetFuncCardFPGALength(addr, bBroadcast, fpgaLength);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetFuncCardFPGALength =
  async function tryFuncCard_SetFuncCardFPGALength(
    this: Session,
    addr: number,
    fpgaLength: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardFPGALength(addr, false, fpgaLength);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
