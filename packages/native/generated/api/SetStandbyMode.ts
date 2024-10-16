import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { StandbyModeEnum } from '../StandbyMode';

declare module '@novastar/codec' {
  interface API {
    SetStandbyMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      standbyMode: StandbyModeEnum
    ): Promise<void>;
    trySetStandbyMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      standbyMode: StandbyModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetStandbyMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  standbyMode: StandbyModeEnum
): Request<Broadcast> {
  const req = new Request([standbyMode], bBroadcast, 'SetStandbyMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StandbyModeAddr;
  return req;
}
Session.prototype.SetStandbyMode = async function SetStandbyMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  standbyMode: StandbyModeEnum
): Promise<void> {
  const req = createSetStandbyMode(addr, portAddr, scanBoardAddr, bBroadcast, standbyMode);
  await this.connection.send(req);
};
Session.prototype.trySetStandbyMode = async function trySetStandbyMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  standbyMode: StandbyModeEnum
): Promise<ErrorType | null> {
  const req = createSetStandbyMode(addr, portAddr, scanBoardAddr, false, standbyMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
