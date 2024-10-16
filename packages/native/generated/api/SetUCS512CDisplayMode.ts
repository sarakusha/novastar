import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetUCS512CDisplayMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      displayMode: number
    ): Promise<void>;
    trySetUCS512CDisplayMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      displayMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetUCS512CDisplayMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  displayMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(displayMode, AddressMapping.GrayBitOccupancy);
  const req = new Request($data, bBroadcast, 'SetUCS512CDisplayMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.UCS512CDisplayModeAddr;
  return req;
}
Session.prototype.SetUCS512CDisplayMode = async function SetUCS512CDisplayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  displayMode: number
): Promise<void> {
  const req = createSetUCS512CDisplayMode(addr, portAddr, scanBoardAddr, bBroadcast, displayMode);
  await this.connection.send(req);
};
Session.prototype.trySetUCS512CDisplayMode = async function trySetUCS512CDisplayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  displayMode: number
): Promise<ErrorType | null> {
  const req = createSetUCS512CDisplayMode(addr, portAddr, scanBoardAddr, false, displayMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
