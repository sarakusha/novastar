import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficientInIIcFlashErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientInIIcFlashErase: number
    ): Promise<void>;
    trySetCoefficientInIIcFlashErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientInIIcFlashErase: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficientInIIcFlashErase<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientInIIcFlashErase: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientInIIcFlashErase,
    AddressMapping.CoefficientInIIcFlashEraseOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetCoefficientInIIcFlashErase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientInIIcFlashEraseAddr;
  return req;
}
Session.prototype.SetCoefficientInIIcFlashErase = async function SetCoefficientInIIcFlashErase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficientInIIcFlashErase: number
): Promise<void> {
  const req = createSetCoefficientInIIcFlashErase(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficientInIIcFlashErase
  );
  await this.connection.send(req);
};
Session.prototype.trySetCoefficientInIIcFlashErase =
  async function trySetCoefficientInIIcFlashErase(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coefficientInIIcFlashErase: number
  ): Promise<ErrorType | null> {
    const req = createSetCoefficientInIIcFlashErase(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coefficientInIIcFlashErase
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
