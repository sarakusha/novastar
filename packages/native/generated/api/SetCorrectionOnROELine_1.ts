import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CorrectTypeEnum } from '../CorrectType';

declare module '@novastar/codec' {
  interface API {
    SetCorrectionOnROELine_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isOpenCorrect: boolean,
      type: CorrectTypeEnum,
      retainClrInfo: boolean
    ): Promise<void>;
    trySetCorrectionOnROELine_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isOpenCorrect: boolean,
      type: CorrectTypeEnum,
      retainClrInfo: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCorrectionOnROELine_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isOpenCorrect: boolean,
  type: CorrectTypeEnum,
  retainClrInfo: boolean
): Request<Broadcast> {
  const req = new Request(
    isOpenCorrect
      ? [0 | 64]
      : [0, 0 | (isOpenCorrect ? 1 : 0), 0 | (type << 1), 0 | (!retainClrInfo ? 4 : 0)],
    bBroadcast,
    'SetCorrectionOnROELine_1'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnAddr;
  return req;
}
Session.prototype.SetCorrectionOnROELine_1 = async function SetCorrectionOnROELine_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isOpenCorrect: boolean,
  type: CorrectTypeEnum,
  retainClrInfo: boolean
): Promise<void> {
  const req = createSetCorrectionOnROELine_1(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    isOpenCorrect,
    type,
    retainClrInfo
  );
  await this.connection.send(req);
};
Session.prototype.trySetCorrectionOnROELine_1 = async function trySetCorrectionOnROELine_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isOpenCorrect: boolean,
  type: CorrectTypeEnum,
  retainClrInfo: boolean
): Promise<ErrorType | null> {
  const req = createSetCorrectionOnROELine_1(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    isOpenCorrect,
    type,
    retainClrInfo
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
