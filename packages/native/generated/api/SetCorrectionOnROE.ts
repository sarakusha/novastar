import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CorrectTypeEnum } from '../CorrectType';

declare module '@novastar/codec' {
  interface API {
    SetCorrectionOnROE(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isOpenCorrect: boolean,
      type: CorrectTypeEnum,
      retainClrInfo: boolean
    ): Promise<void>;
    trySetCorrectionOnROE(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isOpenCorrect: boolean,
      type: CorrectTypeEnum,
      retainClrInfo: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCorrectionOnROE<Broadcast extends boolean>(
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
      ? [0 | 128]
      : [0, 0 | (isOpenCorrect ? 1 : 0), 0 | (type << 1), 0 | (!retainClrInfo ? 4 : 0)],
    bBroadcast,
    'SetCorrectionOnROE'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnAddr;
  return req;
}
Session.prototype.SetCorrectionOnROE = async function SetCorrectionOnROE(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isOpenCorrect: boolean,
  type: CorrectTypeEnum,
  retainClrInfo: boolean
): Promise<void> {
  const req = createSetCorrectionOnROE(
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
Session.prototype.trySetCorrectionOnROE = async function trySetCorrectionOnROE(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isOpenCorrect: boolean,
  type: CorrectTypeEnum,
  retainClrInfo: boolean
): Promise<ErrorType | null> {
  const req = createSetCorrectionOnROE(
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
