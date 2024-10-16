import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBrightnessModel(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      brightnessmodel: number
    ): Promise<void>;
    trySetBrightnessModel(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      brightnessmodel: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBrightnessModel<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  brightnessmodel: number
): Request<Broadcast> {
  const $data = encodeUIntLE(brightnessmodel, AddressMapping.BrightnessModelOccupancy);
  const req = new Request($data, bBroadcast, 'SetBrightnessModel');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BrightnessModelAddr;
  return req;
}
Session.prototype.SetBrightnessModel = async function SetBrightnessModel(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  brightnessmodel: number
): Promise<void> {
  const req = createSetBrightnessModel(addr, portAddr, scanBoardAddr, bBroadcast, brightnessmodel);
  await this.connection.send(req);
};
Session.prototype.trySetBrightnessModel = async function trySetBrightnessModel(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  brightnessmodel: number
): Promise<ErrorType | null> {
  const req = createSetBrightnessModel(addr, portAddr, scanBoardAddr, false, brightnessmodel);
  return (await this.connection.trySend(req))?.ack ?? null;
};
