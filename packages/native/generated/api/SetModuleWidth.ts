import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetModuleWidth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      moduleWidth: number
    ): Promise<void>;
    trySetModuleWidth(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      moduleWidth: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetModuleWidth<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  moduleWidth: number
): Request<Broadcast> {
  const $data = encodeUIntLE(moduleWidth, AddressMapping.ModuleWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetModuleWidth');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleWidthAddr;
  return req;
}
Session.prototype.SetModuleWidth = async function SetModuleWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  moduleWidth: number
): Promise<void> {
  const req = createSetModuleWidth(addr, portAddr, scanBoardAddr, bBroadcast, moduleWidth);
  await this.connection.send(req);
};
Session.prototype.trySetModuleWidth = async function trySetModuleWidth(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  moduleWidth: number
): Promise<ErrorType | null> {
  const req = createSetModuleWidth(addr, portAddr, scanBoardAddr, false, moduleWidth);
  return (await this.connection.trySend(req))?.ack ?? null;
};
