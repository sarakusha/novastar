import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    RecoveryCoefficientStore2SpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientStore2SpiFlash: number
    ): Promise<void>;
    tryRecoveryCoefficientStore2SpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientStore2SpiFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createRecoveryCoefficientStore2SpiFlash<Broadcast extends boolean>(
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
  const req = new Request($data, bBroadcast, 'RecoveryCoefficientStore2SpiFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RecoveryCoefficientStore2SpiFlashAddr;
  return req;
}
Session.prototype.RecoveryCoefficientStore2SpiFlash =
  async function RecoveryCoefficientStore2SpiFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientStore2SpiFlash: number
  ): Promise<void> {
    const req = createRecoveryCoefficientStore2SpiFlash(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coefficientStore2SpiFlash
    );
    await this.connection.send(req);
  };
Session.prototype.tryRecoveryCoefficientStore2SpiFlash =
  async function tryRecoveryCoefficientStore2SpiFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coefficientStore2SpiFlash: number
  ): Promise<ErrorType | null> {
    const req = createRecoveryCoefficientStore2SpiFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coefficientStore2SpiFlash
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
