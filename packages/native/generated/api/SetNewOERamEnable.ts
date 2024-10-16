import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetNewOERamEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      newOERamEnable: number
    ): Promise<void>;
    trySetNewOERamEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      newOERamEnable: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetNewOERamEnable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  newOERamEnable: number
): Request<Broadcast> {
  const $data = encodeUIntLE(newOERamEnable, AddressMapping.NewOERamEnableOccupancy);
  const req = new Request($data, bBroadcast, 'SetNewOERamEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NewOERamEnableAddr;
  return req;
}
Session.prototype.SetNewOERamEnable = async function SetNewOERamEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  newOERamEnable: number
): Promise<void> {
  const req = createSetNewOERamEnable(addr, portAddr, scanBoardAddr, bBroadcast, newOERamEnable);
  await this.connection.send(req);
};
Session.prototype.trySetNewOERamEnable = async function trySetNewOERamEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  newOERamEnable: number
): Promise<ErrorType | null> {
  const req = createSetNewOERamEnable(addr, portAddr, scanBoardAddr, false, newOERamEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
