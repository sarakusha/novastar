import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGamma(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      gamma: number
    ): Promise<void>;
    trySetGamma(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      gamma: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGamma<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  gamma: number
): Request<Broadcast> {
  const $data = encodeUIntLE(gamma, AddressMapping.GammaOccupancy);
  const req = new Request($data, bBroadcast, 'SetGamma');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GammaAddr;
  return req;
}
Session.prototype.SetGamma = async function SetGamma(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  gamma: number
): Promise<void> {
  const req = createSetGamma(addr, portAddr, scanBoardAddr, bBroadcast, gamma);
  await this.connection.send(req);
};
Session.prototype.trySetGamma = async function trySetGamma(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  gamma: number
): Promise<ErrorType | null> {
  const req = createSetGamma(addr, portAddr, scanBoardAddr, false, gamma);
  return (await this.connection.trySend(req))?.ack ?? null;
};
