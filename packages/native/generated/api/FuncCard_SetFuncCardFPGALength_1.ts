import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardFPGALength_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      fpgaLength: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardFPGALength_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      fpgaLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardFPGALength_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  fpgaLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(fpgaLength, AddressMapping.FuncCard_FPGALengthOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGALength_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_FPGALengthAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardFPGALength_1 =
  async function FuncCard_SetFuncCardFPGALength_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    fpgaLength: number
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardFPGALength_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      fpgaLength
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardFPGALength_1 =
  async function tryFuncCard_SetFuncCardFPGALength_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    fpgaLength: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardFPGALength_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      fpgaLength
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
