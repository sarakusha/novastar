import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CoefTypeEnum } from '../CoefType';

declare module '@novastar/codec' {
  interface API {
    MoveCorrectionFromMasterFlashToSdram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coef: CoefTypeEnum
    ): Promise<void>;
    tryMoveCorrectionFromMasterFlashToSdram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coef: CoefTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createMoveCorrectionFromMasterFlashToSdram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coef: CoefTypeEnum
): Request<Broadcast> {
  const req = new Request(Buffer.alloc(1), bBroadcast, 'MoveCorrectionFromMasterFlashToSdram');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address =
    coef === CoefTypeEnum.MultiLayer
      ? AddressMapping.Correction_ApplicationAddr_MultiLayer
      : AddressMapping.Correction_ApplicationAddr;
  return req;
}
Session.prototype.MoveCorrectionFromMasterFlashToSdram =
  async function MoveCorrectionFromMasterFlashToSdram(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = createMoveCorrectionFromMasterFlashToSdram(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coef
    );
    await this.connection.send(req);
  };
Session.prototype.tryMoveCorrectionFromMasterFlashToSdram =
  async function tryMoveCorrectionFromMasterFlashToSdram(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coef: CoefTypeEnum
  ): Promise<ErrorType | null> {
    const req = createMoveCorrectionFromMasterFlashToSdram(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coef
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
