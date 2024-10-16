import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CoefTypeEnum } from '../CoefType';

declare module '@novastar/codec' {
  interface API {
    MoveCorrectionFromSdramToMasterFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coef: CoefTypeEnum
    ): Promise<void>;
    tryMoveCorrectionFromSdramToMasterFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coef: CoefTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createMoveCorrectionFromSdramToMasterFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coef: CoefTypeEnum
): Request<Broadcast> {
  const req = new Request(Buffer.alloc(1), bBroadcast, 'MoveCorrectionFromSdramToMasterFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address =
    coef === CoefTypeEnum.MultiLayer
      ? AddressMapping.Correction_RestitutionAddr_MultiLayer
      : AddressMapping.Correction_RestitutionAddr;
  return req;
}
Session.prototype.MoveCorrectionFromSdramToMasterFlash =
  async function MoveCorrectionFromSdramToMasterFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = createMoveCorrectionFromSdramToMasterFlash(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coef
    );
    await this.connection.send(req);
  };
Session.prototype.tryMoveCorrectionFromSdramToMasterFlash =
  async function tryMoveCorrectionFromSdramToMasterFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coef: CoefTypeEnum
  ): Promise<ErrorType | null> {
    const req = createMoveCorrectionFromSdramToMasterFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coef
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
