import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGrayCoefficientEN(
      Sender: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number
    ): Promise<void>;
    trySetGrayCoefficientEN(
      Sender: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGrayCoefficientEN<Broadcast extends boolean>(
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetGrayCoefficientEN');
  req.destination = Sender;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GrayCoefficientENAddr;
  return req;
}
Session.prototype.SetGrayCoefficientEN = async function SetGrayCoefficientEN(
  this: Session,
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetGrayCoefficientEN(Sender, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetGrayCoefficientEN = async function trySetGrayCoefficientEN(
  this: Session,
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetGrayCoefficientEN(Sender, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
