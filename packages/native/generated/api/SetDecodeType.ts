import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { DecodeTypeEnum } from '../DecodeType';

declare module '@novastar/codec' {
  interface API {
    SetDecodeType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      decodeType: DecodeTypeEnum
    ): Promise<void>;
    trySetDecodeType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      decodeType: DecodeTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDecodeType<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  decodeType: DecodeTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(decodeType, AddressMapping.DecodeTypeOccupancy);
  const req = new Request($data, bBroadcast, 'SetDecodeType');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DecodeTypeAddr;
  return req;
}
Session.prototype.SetDecodeType = async function SetDecodeType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  decodeType: DecodeTypeEnum
): Promise<void> {
  const req = createSetDecodeType(addr, portAddr, scanBoardAddr, bBroadcast, decodeType);
  await this.connection.send(req);
};
Session.prototype.trySetDecodeType = async function trySetDecodeType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  decodeType: DecodeTypeEnum
): Promise<ErrorType | null> {
  const req = createSetDecodeType(addr, portAddr, scanBoardAddr, false, decodeType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
