import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTVCardDVI0OffsetX(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dviOffsetX: number
    ): Promise<void>;
    trySetTVCardDVI0OffsetX(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dviOffsetX: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTVCardDVI0OffsetX<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dviOffsetX: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviOffsetX, AddressMapping.TVCardDVI0OffsetXOccupancy);
  const req = new Request($data, bBroadcast, 'SetTVCardDVI0OffsetX');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0OffsetXAddr;
  return req;
}
Session.prototype.SetTVCardDVI0OffsetX = async function SetTVCardDVI0OffsetX(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dviOffsetX: number
): Promise<void> {
  const req = createSetTVCardDVI0OffsetX(addr, portAddr, scanBoardAddr, bBroadcast, dviOffsetX);
  await this.connection.send(req);
};
Session.prototype.trySetTVCardDVI0OffsetX = async function trySetTVCardDVI0OffsetX(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dviOffsetX: number
): Promise<ErrorType | null> {
  const req = createSetTVCardDVI0OffsetX(addr, portAddr, scanBoardAddr, false, dviOffsetX);
  return (await this.connection.trySend(req))?.ack ?? null;
};
