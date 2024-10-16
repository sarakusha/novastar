import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGammaMaxValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      GammaMaxValue2053: number
    ): Promise<void>;
    trySetGammaMaxValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      GammaMaxValue2053: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGammaMaxValue<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  GammaMaxValue2053: number
): Request<Broadcast> {
  const $data = encodeUIntLE(GammaMaxValue2053, AddressMapping.GammaMaxValue2053Occupancy);
  const req = new Request($data, bBroadcast, 'SetGammaMaxValue');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GammaMaxValue2053Addr;
  return req;
}
Session.prototype.SetGammaMaxValue = async function SetGammaMaxValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  GammaMaxValue2053: number
): Promise<void> {
  const req = createSetGammaMaxValue(addr, portAddr, scanBoardAddr, bBroadcast, GammaMaxValue2053);
  await this.connection.send(req);
};
Session.prototype.trySetGammaMaxValue = async function trySetGammaMaxValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  GammaMaxValue2053: number
): Promise<ErrorType | null> {
  const req = createSetGammaMaxValue(addr, portAddr, scanBoardAddr, false, GammaMaxValue2053);
  return (await this.connection.trySend(req))?.ack ?? null;
};
