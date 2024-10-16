import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetControlWidth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      controlWidth: number
    ): Promise<void>;
    trySetControlWidth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      controlWidth: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetControlWidth<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  controlWidth: number
): Request<Broadcast> {
  const $data = encodeUIntLE(controlWidth, AddressMapping.ControlWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetControlWidth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ControlWidthAddr;
  return req;
}
Session.prototype.SetControlWidth = async function SetControlWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  controlWidth: number
): Promise<void> {
  const req = createSetControlWidth(addr, portAddr, scanBoardAddr, bBroadcast, controlWidth);
  await this.connection.send(req);
};
Session.prototype.trySetControlWidth = async function trySetControlWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  controlWidth: number
): Promise<ErrorType | null> {
  const req = createSetControlWidth(addr, portAddr, scanBoardAddr, false, controlWidth);
  return (await this.connection.trySend(req))?.ack ?? null;
};
