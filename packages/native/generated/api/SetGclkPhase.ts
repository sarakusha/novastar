import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGclkPhase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      gclkPhase: number
    ): Promise<void>;
    trySetGclkPhase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      gclkPhase: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGclkPhase<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  gclkPhase: number
): Request<Broadcast> {
  const $data = encodeUIntLE(gclkPhase, AddressMapping.GclkPhaseOccupancy);
  const req = new Request($data, bBroadcast, 'SetGclkPhase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkPhaseAddr;
  return req;
}
Session.prototype.SetGclkPhase = async function SetGclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  gclkPhase: number
): Promise<void> {
  const req = createSetGclkPhase(addr, portAddr, scanBoardAddr, bBroadcast, gclkPhase);
  await this.connection.send(req);
};
Session.prototype.trySetGclkPhase = async function trySetGclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  gclkPhase: number
): Promise<ErrorType | null> {
  const req = createSetGclkPhase(addr, portAddr, scanBoardAddr, false, gclkPhase);
  return (await this.connection.trySend(req))?.ack ?? null;
};
