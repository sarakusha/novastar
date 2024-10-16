import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRowsCtrlByDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      countCtrlByDataGroup: number[] | Buffer
    ): Promise<void>;
    trySetRowsCtrlByDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      countCtrlByDataGroup: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRowsCtrlByDataGroup<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  countCtrlByDataGroup: number[] | Buffer
): Request<Broadcast> {
  if (
    countCtrlByDataGroup.length !==
    AddressMapping.RowsCtrlByDataGroupOccupancy * AddressMapping.RowsCtrlByDataGroupNum
  )
    throw new TypeError(`Invalid buffer size: ${countCtrlByDataGroup.length}`);
  const req = new Request(countCtrlByDataGroup, bBroadcast, 'SetRowsCtrlByDataGroup');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RowsCtrlByDataGroupAddr;
  return req;
}
Session.prototype.SetRowsCtrlByDataGroup = async function SetRowsCtrlByDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  countCtrlByDataGroup: number[] | Buffer
): Promise<void> {
  const req = createSetRowsCtrlByDataGroup(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    countCtrlByDataGroup
  );
  await this.connection.send(req);
};
Session.prototype.trySetRowsCtrlByDataGroup = async function trySetRowsCtrlByDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  countCtrlByDataGroup: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetRowsCtrlByDataGroup(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    countCtrlByDataGroup
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
