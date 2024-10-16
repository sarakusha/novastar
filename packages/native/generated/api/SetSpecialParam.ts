import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSpecialParam(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      rowChangePoint: number
    ): Promise<void>;
    trySetSpecialParam(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      rowChangePoint: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSpecialParam<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  rowChangePoint: number
): Request<Broadcast> {
  const $data = encodeUIntLE(rowChangePoint, AddressMapping.RowChangePointOccupancy);
  const req = new Request($data, bBroadcast, 'SetSpecialParam');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StartAutoLinearTableAddr;
  return req;
}
Session.prototype.SetSpecialParam = async function SetSpecialParam(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  rowChangePoint: number
): Promise<void> {
  const req = createSetSpecialParam(addr, portAddr, scanBoardAddr, bBroadcast, rowChangePoint);
  await this.connection.send(req);
};
Session.prototype.trySetSpecialParam = async function trySetSpecialParam(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  rowChangePoint: number
): Promise<ErrorType | null> {
  const req = createSetSpecialParam(addr, portAddr, scanBoardAddr, false, rowChangePoint);
  return (await this.connection.trySend(req))?.ack ?? null;
};
