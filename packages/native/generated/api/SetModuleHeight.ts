import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetModuleHeight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      moduleHeight: number
    ): Promise<void>;
    trySetModuleHeight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      moduleHeight: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetModuleHeight<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  moduleHeight: number
): Request<Broadcast> {
  const $data = encodeUIntLE(moduleHeight, AddressMapping.ModuleHeightOccupancy);
  const req = new Request($data, bBroadcast, 'SetModuleHeight');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleHeightAddr;
  return req;
}
Session.prototype.SetModuleHeight = async function SetModuleHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  moduleHeight: number
): Promise<void> {
  const req = createSetModuleHeight(addr, portAddr, scanBoardAddr, bBroadcast, moduleHeight);
  await this.connection.send(req);
};
Session.prototype.trySetModuleHeight = async function trySetModuleHeight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  moduleHeight: number
): Promise<ErrorType | null> {
  const req = createSetModuleHeight(addr, portAddr, scanBoardAddr, false, moduleHeight);
  return (await this.connection.trySend(req))?.ack ?? null;
};
