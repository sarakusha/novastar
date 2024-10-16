import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SaveBrightDarkLineFixCoefsToFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientStore2SpiFlash: number
    ): Promise<void>;
    trySaveBrightDarkLineFixCoefsToFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientStore2SpiFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSaveBrightDarkLineFixCoefsToFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientStore2SpiFlash: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientStore2SpiFlash,
    AddressMapping.CoefficientStore2SpiFlashOccupancy
  );
  const req = new Request($data, bBroadcast, 'SaveBrightDarkLineFixCoefsToFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientStore2SpiFlashAddr;
  return req;
}
Session.prototype.SaveBrightDarkLineFixCoefsToFlash =
  async function SaveBrightDarkLineFixCoefsToFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientStore2SpiFlash: number
  ): Promise<void> {
    const req = createSaveBrightDarkLineFixCoefsToFlash(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coefficientStore2SpiFlash
    );
    await this.connection.send(req);
  };
Session.prototype.trySaveBrightDarkLineFixCoefsToFlash =
  async function trySaveBrightDarkLineFixCoefsToFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coefficientStore2SpiFlash: number
  ): Promise<ErrorType | null> {
    const req = createSaveBrightDarkLineFixCoefsToFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coefficientStore2SpiFlash
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
