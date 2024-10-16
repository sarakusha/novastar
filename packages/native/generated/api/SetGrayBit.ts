import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGrayBit(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      grayBit: number
    ): Promise<void>;
    trySetGrayBit(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      grayBit: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGrayBit<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  grayBit: number
): Request<Broadcast> {
  const $data = encodeUIntLE(grayBit, AddressMapping.GrayBitOccupancy);
  const req = new Request($data, bBroadcast, 'SetGrayBit');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GrayBitAddr;
  return req;
}
Session.prototype.SetGrayBit = async function SetGrayBit(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  grayBit: number
): Promise<void> {
  const req = createSetGrayBit(addr, portAddr, scanBoardAddr, bBroadcast, grayBit);
  await this.connection.send(req);
};
Session.prototype.trySetGrayBit = async function trySetGrayBit(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  grayBit: number
): Promise<ErrorType | null> {
  const req = createSetGrayBit(addr, portAddr, scanBoardAddr, false, grayBit);
  return (await this.connection.trySend(req))?.ack ?? null;
};
