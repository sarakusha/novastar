import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetColorAdjustMatrixAndDataNew(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      byteData: number
    ): Promise<void>;
    trySetColorAdjustMatrixAndDataNew(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      byteData: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetColorAdjustMatrixAndDataNew<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  byteData: number
): Request<Broadcast> {
  const req = new Request([byteData], bBroadcast, 'SetColorAdjustMatrixAndDataNew');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorAdjustMatrixAndEnableAddr;
  return req;
}
Session.prototype.SetColorAdjustMatrixAndDataNew = async function SetColorAdjustMatrixAndDataNew(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  byteData: number
): Promise<void> {
  const req = createSetColorAdjustMatrixAndDataNew(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    byteData
  );
  await this.connection.send(req);
};
Session.prototype.trySetColorAdjustMatrixAndDataNew =
  async function trySetColorAdjustMatrixAndDataNew(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    byteData: number
  ): Promise<ErrorType | null> {
    const req = createSetColorAdjustMatrixAndDataNew(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      byteData
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
