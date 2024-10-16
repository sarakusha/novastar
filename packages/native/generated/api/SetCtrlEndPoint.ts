import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCtrlEndPoint(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      ctrlEndPoint: number
    ): Promise<void>;
    trySetCtrlEndPoint(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      ctrlEndPoint: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCtrlEndPoint<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  ctrlEndPoint: number
): Request<Broadcast> {
  const $data = encodeUIntLE(ctrlEndPoint, AddressMapping.CtrlEndPointOccupancy);
  const req = new Request($data, bBroadcast, 'SetCtrlEndPoint');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CtrlEndPointAddr;
  return req;
}
Session.prototype.SetCtrlEndPoint = async function SetCtrlEndPoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  ctrlEndPoint: number
): Promise<void> {
  const req = createSetCtrlEndPoint(addr, portAddr, scanBoardAddr, bBroadcast, ctrlEndPoint);
  await this.connection.send(req);
};
Session.prototype.trySetCtrlEndPoint = async function trySetCtrlEndPoint(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  ctrlEndPoint: number
): Promise<ErrorType | null> {
  const req = createSetCtrlEndPoint(addr, portAddr, scanBoardAddr, false, ctrlEndPoint);
  return (await this.connection.trySend(req))?.ack ?? null;
};
