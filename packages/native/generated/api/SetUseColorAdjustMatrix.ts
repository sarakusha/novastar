import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetUseColorAdjustMatrix(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isEnableClrMatrix: boolean
    ): Promise<void>;
    trySetUseColorAdjustMatrix(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isEnableClrMatrix: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetUseColorAdjustMatrix<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isEnableClrMatrix: boolean
): Request<Broadcast> {
  const req = new Request(isEnableClrMatrix ? [5] : [255], bBroadcast, 'SetUseColorAdjustMatrix');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.UseColorAdjustMatrixAddr;
  return req;
}
Session.prototype.SetUseColorAdjustMatrix = async function SetUseColorAdjustMatrix(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isEnableClrMatrix: boolean
): Promise<void> {
  const req = createSetUseColorAdjustMatrix(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    isEnableClrMatrix
  );
  await this.connection.send(req);
};
Session.prototype.trySetUseColorAdjustMatrix = async function trySetUseColorAdjustMatrix(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isEnableClrMatrix: boolean
): Promise<ErrorType | null> {
  const req = createSetUseColorAdjustMatrix(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    isEnableClrMatrix
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
