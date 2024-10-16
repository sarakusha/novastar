import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTVCardDVI0OffsetY(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dviOffsetY: number
    ): Promise<void>;
    trySetTVCardDVI0OffsetY(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dviOffsetY: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTVCardDVI0OffsetY<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dviOffsetY: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviOffsetY, AddressMapping.TVCardDVI0OffsetYOccupancy);
  const req = new Request($data, bBroadcast, 'SetTVCardDVI0OffsetY');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0OffsetYAddr;
  return req;
}
Session.prototype.SetTVCardDVI0OffsetY = async function SetTVCardDVI0OffsetY(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dviOffsetY: number
): Promise<void> {
  const req = createSetTVCardDVI0OffsetY(addr, portAddr, scanBoardAddr, bBroadcast, dviOffsetY);
  await this.connection.send(req);
};
Session.prototype.trySetTVCardDVI0OffsetY = async function trySetTVCardDVI0OffsetY(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dviOffsetY: number
): Promise<ErrorType | null> {
  const req = createSetTVCardDVI0OffsetY(addr, portAddr, scanBoardAddr, false, dviOffsetY);
  return (await this.connection.trySend(req))?.ack ?? null;
};
