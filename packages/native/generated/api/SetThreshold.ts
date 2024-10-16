import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetThreshold(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      threshold: number
    ): Promise<void>;
    trySetThreshold(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      threshold: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetThreshold<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  threshold: number
): Request<Broadcast> {
  const $data = encodeUIntLE(threshold, AddressMapping.ThresholdOccupancy);
  const req = new Request($data, bBroadcast, 'SetThreshold');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ThresholdAddr;
  return req;
}
Session.prototype.SetThreshold = async function SetThreshold(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  threshold: number
): Promise<void> {
  const req = createSetThreshold(addr, portAddr, scanBoardAddr, bBroadcast, threshold);
  await this.connection.send(req);
};
Session.prototype.trySetThreshold = async function trySetThreshold(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  threshold: number
): Promise<ErrorType | null> {
  const req = createSetThreshold(addr, portAddr, scanBoardAddr, false, threshold);
  return (await this.connection.trySend(req))?.ack ?? null;
};
