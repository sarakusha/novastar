import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetReadColorCoef(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      val: number
    ): Promise<void>;
    trySetReadColorCoef(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      val: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetReadColorCoef<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  val: number
): Request<Broadcast> {
  const req = new Request([val], bBroadcast, 'SetReadColorCoef');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SetReadColorCoefAddr;
  return req;
}
Session.prototype.SetReadColorCoef = async function SetReadColorCoef(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  val: number
): Promise<void> {
  const req = createSetReadColorCoef(addr, portAddr, scanBoardAddr, bBroadcast, val);
  await this.connection.send(req);
};
Session.prototype.trySetReadColorCoef = async function trySetReadColorCoef(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  val: number
): Promise<ErrorType | null> {
  const req = createSetReadColorCoef(addr, portAddr, scanBoardAddr, false, val);
  return (await this.connection.trySend(req))?.ack ?? null;
};
