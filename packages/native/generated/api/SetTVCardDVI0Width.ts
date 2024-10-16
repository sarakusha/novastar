import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTVCardDVI0Width(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dviWidth: number
    ): Promise<void>;
    trySetTVCardDVI0Width(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dviWidth: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTVCardDVI0Width<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dviWidth: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviWidth, AddressMapping.TVCardDVI0WidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetTVCardDVI0Width');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0WidthAddr;
  return req;
}
Session.prototype.SetTVCardDVI0Width = async function SetTVCardDVI0Width(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dviWidth: number
): Promise<void> {
  const req = createSetTVCardDVI0Width(addr, portAddr, scanBoardAddr, bBroadcast, dviWidth);
  await this.connection.send(req);
};
Session.prototype.trySetTVCardDVI0Width = async function trySetTVCardDVI0Width(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dviWidth: number
): Promise<ErrorType | null> {
  const req = createSetTVCardDVI0Width(addr, portAddr, scanBoardAddr, false, dviWidth);
  return (await this.connection.trySend(req))?.ack ?? null;
};
