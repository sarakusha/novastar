import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetModuelRows(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      moduleRows: number
    ): Promise<void>;
    trySetModuelRows(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      moduleRows: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetModuelRows<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  moduleRows: number
): Request<Broadcast> {
  const $data = encodeUIntLE(moduleRows, AddressMapping.ModuleRowsOccupancy);
  const req = new Request($data, bBroadcast, 'SetModuelRows');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleRowsAddr;
  return req;
}
Session.prototype.SetModuelRows = async function SetModuelRows(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  moduleRows: number
): Promise<void> {
  const req = createSetModuelRows(addr, portAddr, scanBoardAddr, bBroadcast, moduleRows);
  await this.connection.send(req);
};
Session.prototype.trySetModuelRows = async function trySetModuelRows(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  moduleRows: number
): Promise<ErrorType | null> {
  const req = createSetModuelRows(addr, portAddr, scanBoardAddr, false, moduleRows);
  return (await this.connection.trySend(req))?.ack ?? null;
};
