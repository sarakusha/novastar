import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficientStore2IIcFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientStore2IIcFlash: number
    ): Promise<void>;
    trySetCoefficientStore2IIcFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientStore2IIcFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficientStore2IIcFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientStore2IIcFlash: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientStore2IIcFlash,
    AddressMapping.CoefficientStore2IIcFlashOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetCoefficientStore2IIcFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientStore2IIcFlashAddr;
  return req;
}
Session.prototype.SetCoefficientStore2IIcFlash = async function SetCoefficientStore2IIcFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficientStore2IIcFlash: number
): Promise<void> {
  const req = createSetCoefficientStore2IIcFlash(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficientStore2IIcFlash
  );
  await this.connection.send(req);
};
Session.prototype.trySetCoefficientStore2IIcFlash = async function trySetCoefficientStore2IIcFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  coefficientStore2IIcFlash: number
): Promise<ErrorType | null> {
  const req = createSetCoefficientStore2IIcFlash(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    coefficientStore2IIcFlash
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
