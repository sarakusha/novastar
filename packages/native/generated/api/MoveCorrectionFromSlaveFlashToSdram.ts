import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CoefTypeEnum } from '../CoefType';

declare module '@novastar/codec' {
  interface API {
    MoveCorrectionFromSlaveFlashToSdram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coef: CoefTypeEnum
    ): Promise<void>;
    tryMoveCorrectionFromSlaveFlashToSdram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coef: CoefTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createMoveCorrectionFromSlaveFlashToSdram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coef: CoefTypeEnum
): Request<Broadcast> {
  const req = new Request(
    coef === CoefTypeEnum.MultiLayer ? Buffer.alloc(1) : [5],
    bBroadcast,
    'MoveCorrectionFromSlaveFlashToSdram'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address =
    coef === CoefTypeEnum.MultiLayer
      ? AddressMapping.Correction_FactoryAddr_MultiLayer
      : AddressMapping.Correction_FactoryAddr;
  return req;
}
Session.prototype.MoveCorrectionFromSlaveFlashToSdram =
  async function MoveCorrectionFromSlaveFlashToSdram(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = createMoveCorrectionFromSlaveFlashToSdram(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coef
    );
    await this.connection.send(req);
  };
Session.prototype.tryMoveCorrectionFromSlaveFlashToSdram =
  async function tryMoveCorrectionFromSlaveFlashToSdram(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coef: CoefTypeEnum
  ): Promise<ErrorType | null> {
    const req = createMoveCorrectionFromSlaveFlashToSdram(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coef
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
