import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRowsCtrlByDataGroup(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadRowsCtrlByDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadRowsCtrlByDataGroup(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.RowsCtrlByDataGroupOccupancy * AddressMapping.RowsCtrlByDataGroupNum,
    'ReadRowsCtrlByDataGroup'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RowsCtrlByDataGroupAddr;
  return req;
}
Session.prototype.ReadRowsCtrlByDataGroup = async function ReadRowsCtrlByDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadRowsCtrlByDataGroup(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadRowsCtrlByDataGroup = async function tryReadRowsCtrlByDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadRowsCtrlByDataGroup(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
