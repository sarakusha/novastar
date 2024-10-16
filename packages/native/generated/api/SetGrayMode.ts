import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { GrayModeTypeEnum } from '../GrayModeType';
import { GrayRealizeTypeEnum } from '../GrayRealizeType';

declare module '@novastar/codec' {
  interface API {
    SetGrayMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      grayRealize: GrayRealizeTypeEnum,
      grayMode: GrayModeTypeEnum
    ): Promise<void>;
    trySetGrayMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      grayRealize: GrayRealizeTypeEnum,
      grayMode: GrayModeTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGrayMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  grayRealize: GrayRealizeTypeEnum,
  grayMode: GrayModeTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE((grayRealize << 4) + grayMode, AddressMapping.GrayModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetGrayMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GrayModeAddr;
  return req;
}
Session.prototype.SetGrayMode = async function SetGrayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  grayRealize: GrayRealizeTypeEnum,
  grayMode: GrayModeTypeEnum
): Promise<void> {
  const req = createSetGrayMode(addr, portAddr, scanBoardAddr, bBroadcast, grayRealize, grayMode);
  await this.connection.send(req);
};
Session.prototype.trySetGrayMode = async function trySetGrayMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  grayRealize: GrayRealizeTypeEnum,
  grayMode: GrayModeTypeEnum
): Promise<ErrorType | null> {
  const req = createSetGrayMode(addr, portAddr, scanBoardAddr, false, grayRealize, grayMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
