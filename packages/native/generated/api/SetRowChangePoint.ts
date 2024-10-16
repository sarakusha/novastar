import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRowChangePoint(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      rowChangePoint: number
    ): Promise<void>;
    trySetRowChangePoint(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      rowChangePoint: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRowChangePoint<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  rowChangePoint: number
): Request<Broadcast> {
  const $data = encodeUIntLE(rowChangePoint, AddressMapping.RowChangePointOccupancy);
  const req = new Request($data, bBroadcast, 'SetRowChangePoint');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RowChangePointAddr;
  return req;
}
Session.prototype.SetRowChangePoint = async function SetRowChangePoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  rowChangePoint: number
): Promise<void> {
  const req = createSetRowChangePoint(addr, portAddr, scanBoardAddr, bBroadcast, rowChangePoint);
  await this.connection.send(req);
};
Session.prototype.trySetRowChangePoint = async function trySetRowChangePoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  rowChangePoint: number
): Promise<ErrorType | null> {
  const req = createSetRowChangePoint(addr, portAddr, scanBoardAddr, false, rowChangePoint);
  return (await this.connection.trySend(req))?.ack ?? null;
};
