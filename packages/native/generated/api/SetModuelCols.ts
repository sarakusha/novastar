import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetModuelCols(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      moduleCols: number
    ): Promise<void>;
    trySetModuelCols(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      moduleCols: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetModuelCols<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  moduleCols: number
): Request<Broadcast> {
  const $data = encodeUIntLE(moduleCols, AddressMapping.ModuleColsOccupancy);
  const req = new Request($data, bBroadcast, 'SetModuelCols');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleColsAddr;
  return req;
}
Session.prototype.SetModuelCols = async function SetModuelCols(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  moduleCols: number
): Promise<void> {
  const req = createSetModuelCols(addr, portAddr, scanBoardAddr, bBroadcast, moduleCols);
  await this.connection.send(req);
};
Session.prototype.trySetModuelCols = async function trySetModuelCols(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  moduleCols: number
): Promise<ErrorType | null> {
  const req = createSetModuelCols(addr, portAddr, scanBoardAddr, false, moduleCols);
  return (await this.connection.trySend(req))?.ack ?? null;
};
