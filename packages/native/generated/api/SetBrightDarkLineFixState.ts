import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBrightDarkLineFixState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      stateByte: number
    ): Promise<void>;
    trySetBrightDarkLineFixState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      stateByte: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBrightDarkLineFixState<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  stateByte: number
): Request<Broadcast> {
  const req = new Request([stateByte], bBroadcast, 'SetBrightDarkLineFixState');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BrightDarkLineFixStateAddr;
  return req;
}
Session.prototype.SetBrightDarkLineFixState = async function SetBrightDarkLineFixState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  stateByte: number
): Promise<void> {
  const req = createSetBrightDarkLineFixState(addr, portAddr, scanBoardAddr, bBroadcast, stateByte);
  await this.connection.send(req);
};
Session.prototype.trySetBrightDarkLineFixState = async function trySetBrightDarkLineFixState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  stateByte: number
): Promise<ErrorType | null> {
  const req = createSetBrightDarkLineFixState(addr, portAddr, scanBoardAddr, false, stateByte);
  return (await this.connection.trySend(req))?.ack ?? null;
};
