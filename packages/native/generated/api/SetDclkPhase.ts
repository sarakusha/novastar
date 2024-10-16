import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDclkPhase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dclkPhase: number
    ): Promise<void>;
    trySetDclkPhase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dclkPhase: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDclkPhase<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dclkPhase: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dclkPhase, AddressMapping.DclkPhaseOccupancy);
  const req = new Request($data, bBroadcast, 'SetDclkPhase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkPhaseAddr;
  return req;
}
Session.prototype.SetDclkPhase = async function SetDclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dclkPhase: number
): Promise<void> {
  const req = createSetDclkPhase(addr, portAddr, scanBoardAddr, bBroadcast, dclkPhase);
  await this.connection.send(req);
};
Session.prototype.trySetDclkPhase = async function trySetDclkPhase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dclkPhase: number
): Promise<ErrorType | null> {
  const req = createSetDclkPhase(addr, portAddr, scanBoardAddr, false, dclkPhase);
  return (await this.connection.trySend(req))?.ack ?? null;
};
