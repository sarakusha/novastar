import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGrayDepth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      grayDepth: number
    ): Promise<void>;
    trySetGrayDepth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      grayDepth: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGrayDepth<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  grayDepth: number
): Request<Broadcast> {
  const $data = encodeUIntLE(grayDepth, AddressMapping.GrayDepthOccupancy);
  const req = new Request($data, bBroadcast, 'SetGrayDepth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GrayDepthAddr;
  return req;
}
Session.prototype.SetGrayDepth = async function SetGrayDepth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  grayDepth: number
): Promise<void> {
  const req = createSetGrayDepth(addr, portAddr, scanBoardAddr, bBroadcast, grayDepth);
  await this.connection.send(req);
};
Session.prototype.trySetGrayDepth = async function trySetGrayDepth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  grayDepth: number
): Promise<ErrorType | null> {
  const req = createSetGrayDepth(addr, portAddr, scanBoardAddr, false, grayDepth);
  return (await this.connection.trySend(req))?.ack ?? null;
};
