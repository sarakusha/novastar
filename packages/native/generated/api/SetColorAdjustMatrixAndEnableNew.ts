import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetColorAdjustMatrixAndEnableNew(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetColorAdjustMatrixAndEnableNew(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetColorAdjustMatrixAndEnableNew<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request(isEnable ? [4] : [0], bBroadcast, 'SetColorAdjustMatrixAndEnableNew');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorAdjustMatrixAndEnableAddr;
  return req;
}
Session.prototype.SetColorAdjustMatrixAndEnableNew =
  async function SetColorAdjustMatrixAndEnableNew(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = createSetColorAdjustMatrixAndEnableNew(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      isEnable
    );
    await this.connection.send(req);
  };
Session.prototype.trySetColorAdjustMatrixAndEnableNew =
  async function trySetColorAdjustMatrixAndEnableNew(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    isEnable: boolean
  ): Promise<ErrorType | null> {
    const req = createSetColorAdjustMatrixAndEnableNew(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      isEnable
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
