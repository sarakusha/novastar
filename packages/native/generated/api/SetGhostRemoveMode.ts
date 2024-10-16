import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { GhostRemoveModeTypeEnum } from '../GhostRemoveModeType';

declare module '@novastar/codec' {
  interface API {
    SetGhostRemoveMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      ghostRemoveMode: GhostRemoveModeTypeEnum
    ): Promise<void>;
    trySetGhostRemoveMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      ghostRemoveMode: GhostRemoveModeTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGhostRemoveMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  ghostRemoveMode: GhostRemoveModeTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(ghostRemoveMode, AddressMapping.GhostRemoveModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetGhostRemoveMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GhostRemoveModeAddr;
  return req;
}
Session.prototype.SetGhostRemoveMode = async function SetGhostRemoveMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  ghostRemoveMode: GhostRemoveModeTypeEnum
): Promise<void> {
  const req = createSetGhostRemoveMode(addr, portAddr, scanBoardAddr, bBroadcast, ghostRemoveMode);
  await this.connection.send(req);
};
Session.prototype.trySetGhostRemoveMode = async function trySetGhostRemoveMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  ghostRemoveMode: GhostRemoveModeTypeEnum
): Promise<ErrorType | null> {
  const req = createSetGhostRemoveMode(addr, portAddr, scanBoardAddr, false, ghostRemoveMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
