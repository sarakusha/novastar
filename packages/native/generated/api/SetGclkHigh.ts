import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGclkHigh(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      gclkHigh: number
    ): Promise<void>;
    trySetGclkHigh(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      gclkHigh: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGclkHigh<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  gclkHigh: number
): Request<Broadcast> {
  const $data = encodeUIntLE(gclkHigh, AddressMapping.GclkHighOccupancy);
  const req = new Request($data, bBroadcast, 'SetGclkHigh');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkHighAddr;
  return req;
}
Session.prototype.SetGclkHigh = async function SetGclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  gclkHigh: number
): Promise<void> {
  const req = createSetGclkHigh(addr, portAddr, scanBoardAddr, bBroadcast, gclkHigh);
  await this.connection.send(req);
};
Session.prototype.trySetGclkHigh = async function trySetGclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  gclkHigh: number
): Promise<ErrorType | null> {
  const req = createSetGclkHigh(addr, portAddr, scanBoardAddr, false, gclkHigh);
  return (await this.connection.trySend(req))?.ack ?? null;
};
