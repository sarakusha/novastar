import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTotalPointInTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      totalPointInTable: number
    ): Promise<void>;
    trySetTotalPointInTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      totalPointInTable: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTotalPointInTable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  totalPointInTable: number
): Request<Broadcast> {
  const $data = encodeUIntLE(totalPointInTable, AddressMapping.TotalPointInTableOccupancy);
  const req = new Request($data, bBroadcast, 'SetTotalPointInTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalPointInTableAddr;
  return req;
}
Session.prototype.SetTotalPointInTable = async function SetTotalPointInTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  totalPointInTable: number
): Promise<void> {
  const req = createSetTotalPointInTable(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    totalPointInTable
  );
  await this.connection.send(req);
};
Session.prototype.trySetTotalPointInTable = async function trySetTotalPointInTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  totalPointInTable: number
): Promise<ErrorType | null> {
  const req = createSetTotalPointInTable(addr, portAddr, scanBoardAddr, false, totalPointInTable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
