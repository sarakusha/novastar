import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDclkHigh(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dclkHigh: number
    ): Promise<void>;
    trySetDclkHigh(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dclkHigh: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDclkHigh<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dclkHigh: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dclkHigh, AddressMapping.DclkHighOccupancy);
  const req = new Request($data, bBroadcast, 'SetDclkHigh');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkHighAddr;
  return req;
}
Session.prototype.SetDclkHigh = async function SetDclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dclkHigh: number
): Promise<void> {
  const req = createSetDclkHigh(addr, portAddr, scanBoardAddr, bBroadcast, dclkHigh);
  await this.connection.send(req);
};
Session.prototype.trySetDclkHigh = async function trySetDclkHigh(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dclkHigh: number
): Promise<ErrorType | null> {
  const req = createSetDclkHigh(addr, portAddr, scanBoardAddr, false, dclkHigh);
  return (await this.connection.trySend(req))?.ack ?? null;
};
