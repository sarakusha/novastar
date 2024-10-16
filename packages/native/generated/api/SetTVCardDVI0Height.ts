import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTVCardDVI0Height(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dviHeight: number
    ): Promise<void>;
    trySetTVCardDVI0Height(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dviHeight: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTVCardDVI0Height<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dviHeight: number
): Request<Broadcast> {
  const $data = encodeUIntLE(dviHeight, AddressMapping.TVCardDVI0HeightOccupancy);
  const req = new Request($data, bBroadcast, 'SetTVCardDVI0Height');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TVCardDVI0HeightAddr;
  return req;
}
Session.prototype.SetTVCardDVI0Height = async function SetTVCardDVI0Height(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dviHeight: number
): Promise<void> {
  const req = createSetTVCardDVI0Height(addr, portAddr, scanBoardAddr, bBroadcast, dviHeight);
  await this.connection.send(req);
};
Session.prototype.trySetTVCardDVI0Height = async function trySetTVCardDVI0Height(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dviHeight: number
): Promise<ErrorType | null> {
  const req = createSetTVCardDVI0Height(addr, portAddr, scanBoardAddr, false, dviHeight);
  return (await this.connection.trySend(req))?.ack ?? null;
};
