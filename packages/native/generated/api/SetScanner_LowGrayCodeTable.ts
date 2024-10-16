import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_LowGrayCodeTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lowGrayCodeTable: number[] | Buffer
    ): Promise<void>;
    trySetScanner_LowGrayCodeTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lowGrayCodeTable: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_LowGrayCodeTable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lowGrayCodeTable: number[] | Buffer
): Request<Broadcast> {
  if (lowGrayCodeTable.length !== AddressMapping.LowGrayCodeTableOccupancy)
    throw new TypeError(`Invalid buffer size: ${lowGrayCodeTable.length}`);
  const req = new Request(lowGrayCodeTable, bBroadcast, 'SetScanner_LowGrayCodeTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowGrayCodeTableAddr;
  return req;
}
Session.prototype.SetScanner_LowGrayCodeTable = async function SetScanner_LowGrayCodeTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lowGrayCodeTable: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_LowGrayCodeTable(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    lowGrayCodeTable
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_LowGrayCodeTable = async function trySetScanner_LowGrayCodeTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lowGrayCodeTable: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_LowGrayCodeTable(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    lowGrayCodeTable
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
