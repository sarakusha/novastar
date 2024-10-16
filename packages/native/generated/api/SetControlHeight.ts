import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetControlHeight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      controlHeight: number
    ): Promise<void>;
    trySetControlHeight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      controlHeight: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetControlHeight<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  controlHeight: number
): Request<Broadcast> {
  const $data = encodeUIntLE(controlHeight, AddressMapping.ControlHeightOccupancy);
  const req = new Request($data, bBroadcast, 'SetControlHeight');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ControlHeightAddr;
  return req;
}
Session.prototype.SetControlHeight = async function SetControlHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  controlHeight: number
): Promise<void> {
  const req = createSetControlHeight(addr, portAddr, scanBoardAddr, bBroadcast, controlHeight);
  await this.connection.send(req);
};
Session.prototype.trySetControlHeight = async function trySetControlHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  controlHeight: number
): Promise<ErrorType | null> {
  const req = createSetControlHeight(addr, portAddr, scanBoardAddr, false, controlHeight);
  return (await this.connection.trySend(req))?.ack ?? null;
};
