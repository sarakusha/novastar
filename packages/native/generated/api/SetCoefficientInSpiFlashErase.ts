import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficientInSpiFlashErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientInSpiFlashErase: number
    ): Promise<void>;
    trySetCoefficientInSpiFlashErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientInSpiFlashErase: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficientInSpiFlashErase<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientInSpiFlashErase: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientInSpiFlashErase,
    AddressMapping.CoefficientInSpiFlashEraseOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetCoefficientInSpiFlashErase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientInSpiFlashEraseAddr;
  return req;
}
Session.prototype.SetCoefficientInSpiFlashErase = async function SetCoefficientInSpiFlashErase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficientInSpiFlashErase: number
): Promise<void> {
  const req = createSetCoefficientInSpiFlashErase(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficientInSpiFlashErase
  );
  await this.connection.send(req);
};
Session.prototype.trySetCoefficientInSpiFlashErase =
  async function trySetCoefficientInSpiFlashErase(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coefficientInSpiFlashErase: number
  ): Promise<ErrorType | null> {
    const req = createSetCoefficientInSpiFlashErase(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coefficientInSpiFlashErase
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
