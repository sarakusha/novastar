import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScaleInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scaleInfo: number
    ): Promise<void>;
    trySetScaleInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scaleInfo: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScaleInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scaleInfo: number
): Request<Broadcast> {
  const $data = encodeUIntLE(scaleInfo, AddressMapping.ScaleInfoOccupancy);
  const req = new Request($data, bBroadcast, 'SetScaleInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScaleInfoAddr;
  return req;
}
Session.prototype.SetScaleInfo = async function SetScaleInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scaleInfo: number
): Promise<void> {
  const req = createSetScaleInfo(addr, portAddr, scanBoardAddr, bBroadcast, scaleInfo);
  await this.connection.send(req);
};
Session.prototype.trySetScaleInfo = async function trySetScaleInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scaleInfo: number
): Promise<ErrorType | null> {
  const req = createSetScaleInfo(addr, portAddr, scanBoardAddr, false, scaleInfo);
  return (await this.connection.trySend(req))?.ack ?? null;
};
