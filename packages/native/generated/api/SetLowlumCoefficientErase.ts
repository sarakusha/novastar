import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLowlumCoefficientErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientErase: number[] | Buffer
    ): Promise<void>;
    trySetLowlumCoefficientErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientErase: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLowlumCoefficientErase<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientErase: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(coefficientErase, bBroadcast, 'SetLowlumCoefficientErase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientInIIcFlashEraseAddr;
  return req;
}
Session.prototype.SetLowlumCoefficientErase = async function SetLowlumCoefficientErase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficientErase: number[] | Buffer
): Promise<void> {
  const req = createSetLowlumCoefficientErase(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficientErase
  );
  await this.connection.send(req);
};
Session.prototype.trySetLowlumCoefficientErase = async function trySetLowlumCoefficientErase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  coefficientErase: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetLowlumCoefficientErase(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    coefficientErase
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
