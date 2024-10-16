import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardMCULength_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      mcuLength: number
    ): Promise<void>;
    tryFuncCard_SetFuncCardMCULength_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      mcuLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardMCULength_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  mcuLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(mcuLength, AddressMapping.FuncCard_MCUProgramLengthOccupancy);
  const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCULength_1');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardMCULength_1 = async function FuncCard_SetFuncCardMCULength_1(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: boolean,
  mcuLength: number
): Promise<void> {
  const req = createFuncCard_SetFuncCardMCULength_1(
    addr,
    portAddr,
    funcCardAddr,
    bBroadcast,
    mcuLength
  );
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetFuncCardMCULength_1 =
  async function tryFuncCard_SetFuncCardMCULength_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    mcuLength: number
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardMCULength_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      mcuLength
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
