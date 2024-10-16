import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_NewOETable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      newOETable: number[] | Buffer
    ): Promise<void>;
    trySetScanner_NewOETable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      newOETable: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_NewOETable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  newOETable: number[] | Buffer
): Request<Broadcast> {
  if (newOETable.length !== AddressMapping.NewOETableOccupancy)
    throw new TypeError(`Invalid buffer size: ${newOETable.length}`);
  const req = new Request(newOETable, bBroadcast, 'SetScanner_NewOETable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NewOETableAddr;
  return req;
}
Session.prototype.SetScanner_NewOETable = async function SetScanner_NewOETable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  newOETable: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_NewOETable(addr, portAddr, scanBoardAddr, bBroadcast, newOETable);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_NewOETable = async function trySetScanner_NewOETable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  newOETable: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_NewOETable(addr, portAddr, scanBoardAddr, false, newOETable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
