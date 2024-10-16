import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CoefTypeEnum } from '../CoefType';

declare module '@novastar/codec' {
  interface API {
    MoveCorrectionFromSdramToSlaveFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coef: CoefTypeEnum
    ): Promise<void>;
    tryMoveCorrectionFromSdramToSlaveFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coef: CoefTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createMoveCorrectionFromSdramToSlaveFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coef: CoefTypeEnum
): Request<Broadcast> {
  const req = new Request(
    coef === CoefTypeEnum.MultiLayer ? Buffer.alloc(1) : [5],
    bBroadcast,
    'MoveCorrectionFromSdramToSlaveFlash'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address =
    coef === CoefTypeEnum.MultiLayer
      ? AddressMapping.Correction_SolidificationAddr_MultiLayer
      : AddressMapping.Correction_SolidificationAddr;
  return req;
}
Session.prototype.MoveCorrectionFromSdramToSlaveFlash =
  async function MoveCorrectionFromSdramToSlaveFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = createMoveCorrectionFromSdramToSlaveFlash(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coef
    );
    await this.connection.send(req);
  };
Session.prototype.tryMoveCorrectionFromSdramToSlaveFlash =
  async function tryMoveCorrectionFromSdramToSlaveFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coef: CoefTypeEnum
  ): Promise<ErrorType | null> {
    const req = createMoveCorrectionFromSdramToSlaveFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coef
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
