import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDclkHighRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dclkHighRatio: number
    ): Promise<void>;
    trySetDclkHighRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dclkHighRatio: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDclkHighRatio<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dclkHighRatio: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dclkHighRatio, AddressMapping.DclkHighRatioOccupancy);
  const req = new Request($data, bBroadcast, 'SetDclkHighRatio');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DclkHighRatioAddr;
  return req;
}
Session.prototype.SetDclkHighRatio = async function SetDclkHighRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dclkHighRatio: number
): Promise<void> {
  const req = createSetDclkHighRatio(addr, portAddr, scanBoardAddr, bBroadcast, dclkHighRatio);
  await this.connection.send(req);
};
Session.prototype.trySetDclkHighRatio = async function trySetDclkHighRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dclkHighRatio: number
): Promise<ErrorType | null> {
  const req = createSetDclkHighRatio(addr, portAddr, scanBoardAddr, false, dclkHighRatio);
  return (await this.connection.trySend(req))?.ack ?? null;
};
