import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_NewOEHighTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      newOETable: number[] | Buffer
    ): Promise<void>;
    trySetScanner_NewOEHighTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      newOETable: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_NewOEHighTable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  newOETable: number[] | Buffer
): Request<Broadcast> {
  if (newOETable.length !== AddressMapping.NewOEHighTableOccupancy)
    throw new TypeError(`Invalid buffer size: ${newOETable.length}`);
  const req = new Request(newOETable, bBroadcast, 'SetScanner_NewOEHighTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NewOEHighTableAddr;
  return req;
}
Session.prototype.SetScanner_NewOEHighTable = async function SetScanner_NewOEHighTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  newOETable: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_NewOEHighTable(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    newOETable
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_NewOEHighTable = async function trySetScanner_NewOEHighTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  newOETable: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_NewOEHighTable(addr, portAddr, scanBoardAddr, false, newOETable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
