import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetKillMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      killMode: number
    ): Promise<void>;
    trySetKillMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      killMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetKillMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  killMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(killMode, AddressMapping.KillModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetKillMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.KillModeAddr;
  return req;
}
Session.prototype.SetKillMode = async function SetKillMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  killMode: number
): Promise<void> {
  const req = createSetKillMode(addr, portAddr, scanBoardAddr, bBroadcast, killMode);
  await this.connection.send(req);
};
Session.prototype.trySetKillMode = async function trySetKillMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  killMode: number
): Promise<ErrorType | null> {
  const req = createSetKillMode(addr, portAddr, scanBoardAddr, false, killMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
