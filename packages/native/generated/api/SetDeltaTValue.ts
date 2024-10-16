import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDeltaTValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      deltaT: number
    ): Promise<void>;
    trySetDeltaTValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      deltaT: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDeltaTValue<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  deltaT: number
): Request<Broadcast> {
  const req = new Request([deltaT], bBroadcast, 'SetDeltaTValue');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DeltaTAddr;
  return req;
}
Session.prototype.SetDeltaTValue = async function SetDeltaTValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  deltaT: number
): Promise<void> {
  const req = createSetDeltaTValue(addr, portAddr, scanBoardAddr, bBroadcast, deltaT);
  await this.connection.send(req);
};
Session.prototype.trySetDeltaTValue = async function trySetDeltaTValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  deltaT: number
): Promise<ErrorType | null> {
  const req = createSetDeltaTValue(addr, portAddr, scanBoardAddr, false, deltaT);
  return (await this.connection.trySend(req))?.ack ?? null;
};
